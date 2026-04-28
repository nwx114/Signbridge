from flask import Flask, request, jsonify
import os
import sqlite3
import json

# 尝试导入图像处理相关模块
try:
    import cv2
    import numpy as np
    import pickle
    from keras.models import load_model
    from PIL import Image
    import base64
    import io
    IMAGE_PROCESSING_AVAILABLE = True
except ImportError as e:
    print(f"警告：图像处理模块导入失败: {e}")
    print("将使用简化模式启动，手势识别功能将不可用")
    cv2 = None
    np = None
    pickle = None
    load_model = None
    Image = None
    base64 = None
    io = None
    IMAGE_PROCESSING_AVAILABLE = False

app = Flask(__name__)

# 数据库文件路径
DATABASE = 'forum.db'

# 初始化数据库
def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    # 创建帖子点赞表
    c.execute('''
        CREATE TABLE IF NOT EXISTS post_likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id TEXT NOT NULL,
            user_id TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(post_id, user_id)
        )
    ''')
    
    # 创建回复表
    c.execute('''
        CREATE TABLE IF NOT EXISTS replies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id TEXT NOT NULL,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 创建回复点赞表
    c.execute('''
        CREATE TABLE IF NOT EXISTS reply_likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reply_id INTEGER NOT NULL,
            user_id TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(reply_id, user_id),
            FOREIGN KEY (reply_id) REFERENCES replies(id)
        )
    ''')
    
    conn.commit()
    conn.close()

# 获取帖子点赞数
@app.route('/api/post-likes/<post_id>', methods=['GET'])
def get_post_likes(post_id):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('SELECT COUNT(*) FROM post_likes WHERE post_id = ?', (post_id,))
    count = c.fetchone()[0]
    conn.close()
    return jsonify({'count': count})

# 切换帖子点赞
@app.route('/api/post-likes/<post_id>/toggle', methods=['POST'])
def toggle_post_like(post_id):
    data = request.json
    user_id = data.get('user_id', 'guest')
    
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    try:
        # 检查是否已点赞
        c.execute('SELECT * FROM post_likes WHERE post_id = ? AND user_id = ?', (post_id, user_id))
        existing = c.fetchone()
        
        if existing:
            # 取消点赞
            c.execute('DELETE FROM post_likes WHERE post_id = ? AND user_id = ?', (post_id, user_id))
            liked = False
        else:
            # 添加点赞
            c.execute('INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)', (post_id, user_id))
            liked = True
        
        conn.commit()
        
        # 获取最新点赞数
        c.execute('SELECT COUNT(*) FROM post_likes WHERE post_id = ?', (post_id,))
        count = c.fetchone()[0]
        
        return jsonify({'count': count, 'liked': liked})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# 获取帖子回复列表
@app.route('/api/replies/<post_id>', methods=['GET'])
def get_replies(post_id):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''
        SELECT r.id, r.author, r.content, r.created_at, COUNT(l.id) as likes
        FROM replies r
        LEFT JOIN reply_likes l ON r.id = l.reply_id
        WHERE r.post_id = ?
        GROUP BY r.id
        ORDER BY r.created_at DESC
    ''', (post_id,))
    
    replies = []
    for row in c.fetchall():
        replies.append({
            'id': row[0],
            'author': row[1],
            'content': row[2],
            'time': row[3],
            'likes': row[4]
        })
    
    conn.close()
    return jsonify(replies)

# 添加回复
@app.route('/api/replies/<post_id>', methods=['POST'])
def add_reply(post_id):
    data = request.json
    author = data.get('author', '游客')
    content = data.get('content', '')
    
    if not content:
        return jsonify({'error': '内容不能为空'}), 400
    
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    try:
        c.execute('INSERT INTO replies (post_id, author, content) VALUES (?, ?, ?)', 
                  (post_id, author, content))
        conn.commit()
        
        # 获取新回复ID
        reply_id = c.lastrowid
        
        # 获取回复详情
        c.execute('''
            SELECT r.id, r.author, r.content, r.created_at, COUNT(l.id) as likes
            FROM replies r
            LEFT JOIN reply_likes l ON r.id = l.reply_id
            WHERE r.id = ?
            GROUP BY r.id
        ''', (reply_id,))
        
        row = c.fetchone()
        reply = {
            'id': row[0],
            'author': row[1],
            'content': row[2],
            'time': row[3],
            'likes': row[4]
        }
        
        return jsonify(reply)
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# 删除回复
@app.route('/api/replies/<reply_id>', methods=['DELETE'])
def delete_reply(reply_id):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    try:
        # 先删除相关的点赞记录
        c.execute('DELETE FROM reply_likes WHERE reply_id = ?', (reply_id,))
        
        # 然后删除回复
        c.execute('DELETE FROM replies WHERE id = ?', (reply_id,))
        
        conn.commit()
        
        if c.rowcount > 0:
            return jsonify({'success': True, 'message': '删除成功'})
        else:
            return jsonify({'success': False, 'error': '回复不存在'}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

# 切换回复点赞
@app.route('/api/replies/<reply_id>/likes/toggle', methods=['POST'])
def toggle_reply_like(reply_id):
    data = request.json
    user_id = data.get('user_id', 'guest')
    
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    try:
        # 检查是否已点赞
        c.execute('SELECT * FROM reply_likes WHERE reply_id = ? AND user_id = ?', (reply_id, user_id))
        existing = c.fetchone()
        
        if existing:
            # 取消点赞
            c.execute('DELETE FROM reply_likes WHERE reply_id = ? AND user_id = ?', (reply_id, user_id))
            liked = False
        else:
            # 添加点赞
            c.execute('INSERT INTO reply_likes (reply_id, user_id) VALUES (?, ?)', (reply_id, user_id))
            liked = True
        
        conn.commit()
        
        # 获取最新点赞数
        c.execute('SELECT COUNT(*) FROM reply_likes WHERE reply_id = ?', (reply_id,))
        count = c.fetchone()[0]
        
        return jsonify({'count': count, 'liked': liked})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# 获取帖子的最高赞评论
@app.route('/api/posts/<post_id>/top-reply', methods=['GET'])
def get_top_reply(post_id):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    try:
        # 查询点赞数最高的评论（按点赞数降序排序，取第一条）
        c.execute('''
            SELECT r.id, r.author, r.content, r.created_at, COUNT(l.id) as likes
            FROM replies r
            LEFT JOIN reply_likes l ON r.id = l.reply_id
            WHERE r.post_id = ?
            GROUP BY r.id
            ORDER BY likes DESC, r.created_at ASC
            LIMIT 1
        ''', (post_id,))
        
        row = c.fetchone()
        
        if row:
            return jsonify({
                'success': True,
                'data': {
                    'id': row[0],
                    'author': row[1],
                    'content': row[2],
                    'time': row[3],
                    'likes': row[4]
                }
            })
        else:
            return jsonify({'success': True, 'data': None})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

# 初始化数据库
init_db()

# 加载模型和相关资源
def load_resources():
    if not IMAGE_PROCESSING_AVAILABLE:
        print("跳过模型加载：图像处理模块不可用")
        return
    
    global model, hist, image_x, image_y
    
    # 加载模型
    model = load_model('dm/Sign-Language-Interpreter-using-Deep-Learning-master/Code/cnn_model_keras2.h5')
    
    # 加载手部直方图
    with open("dm/Sign-Language-Interpreter-using-Deep-Learning-master/Code/hist", "rb") as f:
        hist = pickle.load(f)
    
    # 获取图像尺寸
    img = cv2.imread('dm/Sign-Language-Interpreter-using-Deep-Learning-master/Code/gestures/0/100.jpg', 0)
    image_x, image_y = img.shape

# 预处理图像
def keras_process_image(img):
    if not IMAGE_PROCESSING_AVAILABLE:
        return None
    
    img = cv2.resize(img, (image_x, image_y))
    img = np.array(img, dtype=np.float32)
    img = np.reshape(img, (1, image_x, image_y, 1))
    return img

# 预测手势
def keras_predict(model, image):
    if not IMAGE_PROCESSING_AVAILABLE:
        return 0, 0
    
    processed = keras_process_image(image)
    pred_probab = model.predict(processed)[0]
    pred_class = list(pred_probab).index(max(pred_probab))
    return max(pred_probab), pred_class

# 从数据库获取预测文本
def get_pred_text_from_db(pred_class):
    if not IMAGE_PROCESSING_AVAILABLE:
        return ""
    
    conn = sqlite3.connect("dm/Sign-Language-Interpreter-using-Deep-Learning-master/Code/gesture_db.db")
    cmd = "SELECT g_name FROM gesture WHERE g_id="+str(pred_class)
    cursor = conn.execute(cmd)
    for row in cursor:
        return row[0]

# 获取轮廓和阈值
def get_img_contour_thresh(img):
    if not IMAGE_PROCESSING_AVAILABLE:
        return img, [], img
    
    img = cv2.flip(img, 1)
    imgHSV = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    dst = cv2.calcBackProject([imgHSV], [0, 1], hist, [0, 180, 0, 256], 1)
    disc = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(10,10))
    cv2.filter2D(dst,-1,disc,dst)
    blur = cv2.GaussianBlur(dst, (11,11), 0)
    blur = cv2.medianBlur(blur, 15)
    thresh = cv2.threshold(blur,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)[1]
    thresh = cv2.merge((thresh,thresh,thresh))
    thresh = cv2.cvtColor(thresh, cv2.COLOR_BGR2GRAY)
    # 定义感兴趣区域
    x, y, w, h = 300, 100, 300, 300
    thresh = thresh[y:y+h, x:x+w]
    contours = cv2.findContours(thresh.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)[0]
    return img, contours, thresh

# 从轮廓获取预测
def get_pred_from_contour(contour, thresh):
    if not IMAGE_PROCESSING_AVAILABLE:
        return ""
    
    x1, y1, w1, h1 = cv2.boundingRect(contour)
    save_img = thresh[y1:y1+h1, x1:x1+w1]
    text = ""
    if w1 > h1:
        save_img = cv2.copyMakeBorder(save_img, int((w1-h1)/2) , int((w1-h1)/2) , 0, 0, cv2.BORDER_CONSTANT, (0, 0, 0))
    elif h1 > w1:
        save_img = cv2.copyMakeBorder(save_img, 0, 0, int((h1-w1)/2) , int((h1-w1)/2) , cv2.BORDER_CONSTANT, (0, 0, 0))
    pred_probab, pred_class = keras_predict(model, save_img)
    if pred_probab*100 > 70:
        text = get_pred_text_from_db(pred_class)
    return text

# 处理图像并返回识别结果
@app.route('/recognize', methods=['POST'])
def recognize():
    if not IMAGE_PROCESSING_AVAILABLE:
        return jsonify({'error': '图像处理功能不可用，请安装必要的依赖'}), 503
    
    try:
        # 接收前端发送的图像数据
        data = request.json
        image_data = data['image']
        
        # 解码base64图像数据
        image_data = image_data.split(',')[1]  # 移除data:image/jpeg;base64,前缀
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        
        # 转换为OpenCV格式
        img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # 调整图像大小
        img = cv2.resize(img, (640, 480))
        
        # 获取轮廓和阈值
        img, contours, thresh = get_img_contour_thresh(img)
        
        # 识别手势
        text = ""
        if len(contours) > 0:
            contour = max(contours, key=cv2.contourArea)
            if cv2.contourArea(contour) > 10000:
                text = get_pred_from_contour(contour, thresh)
        
        # 返回识别结果
        return jsonify({'result': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # 加载资源
    load_resources()
    # 启动服务器
    app.run(host='0.0.0.0', port=5000, debug=True)
