from flask import Flask, request, jsonify
import cv2
import numpy as np
import pickle
import os
import sqlite3
from keras.models import load_model
from PIL import Image
import base64
import io

app = Flask(__name__)

# 加载模型和相关资源
def load_resources():
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
    img = cv2.resize(img, (image_x, image_y))
    img = np.array(img, dtype=np.float32)
    img = np.reshape(img, (1, image_x, image_y, 1))
    return img

# 预测手势
def keras_predict(model, image):
    processed = keras_process_image(image)
    pred_probab = model.predict(processed)[0]
    pred_class = list(pred_probab).index(max(pred_probab))
    return max(pred_probab), pred_class

# 从数据库获取预测文本
def get_pred_text_from_db(pred_class):
    conn = sqlite3.connect("dm/Sign-Language-Interpreter-using-Deep-Learning-master/Code/gesture_db.db")
    cmd = "SELECT g_name FROM gesture WHERE g_id="+str(pred_class)
    cursor = conn.execute(cmd)
    for row in cursor:
        return row[0]

# 获取轮廓和阈值
def get_img_contour_thresh(img):
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
