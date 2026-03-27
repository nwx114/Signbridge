# SignBridge 后端服务

SignBridge 是一个智能手语交流平台，本项目是其后端服务部分，基于 Django 框架开发。

## 项目结构

```
signbridge/
├── signbridge/           # 项目配置目录
│   ├── settings.py       # 项目设置
│   ├── urls.py           # 主URL配置
│   └── wsgi.py           # WSGI接口
├── users/                # 用户管理应用
├── translation/          # 翻译记录应用
├── forum/                # 论坛系统应用
├── emergency/            # 紧急求助应用
├── learning/             # 学习系统应用
├── manage.py             # 管理脚本
└── requirements.txt      # 依赖包列表
```

## 核心功能

1. **用户管理系统**：用户注册、登录、个人资料管理
2. **翻译记录系统**：存储和查询手语翻译历史
3. **手语论坛系统**：帖子发布、回复、分类管理
4. **紧急求助系统**：求助提交、状态管理
5. **手语学习系统**：课程管理、学习进度跟踪

## 技术栈

- **后端框架**：Django 6.0.3
- **API框架**：Django REST Framework 3.15.2
- **数据库**：MySQL 8.0+
- **认证**：JWT（JSON Web Token）
- **跨域**：django-cors-headers

## 安装步骤

### 1. 环境准备

- Python 3.8+
- MySQL 8.0+
- pip 包管理器

### 2. 安装依赖

```bash
cd signbridge
pip install -r requirements.txt
```

### 3. 数据库配置

1. 在 MySQL 中创建数据库：
   ```sql
   CREATE DATABASE signbridge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. 修改 `signbridge/settings.py` 中的数据库配置：
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'signbridge',
           'USER': 'your_username',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '3306',
       }
   }
   ```

### 4. 数据库迁移

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. 创建超级用户

```bash
python manage.py createsuperuser
```

### 6. 运行开发服务器

```bash
python manage.py runserver
```

## API 接口

### 用户管理
- `POST /api/auth/register/` - 用户注册
- `POST /api/auth/login/` - 用户登录
- `GET /api/auth/user/` - 获取当前用户信息
- `PUT /api/auth/user/` - 更新用户信息

### 翻译记录
- `GET /api/translation/history/` - 获取翻译历史
- `POST /api/translation/history/` - 创建翻译记录

### 论坛系统
- `GET /api/forum/categories/` - 获取论坛分类
- `GET /api/forum/posts/` - 获取帖子列表
- `POST /api/forum/posts/` - 创建帖子
- `GET /api/forum/replies/` - 获取回复列表
- `POST /api/forum/replies/` - 创建回复

### 紧急求助
- `GET /api/emergency/types/` - 获取求助类型
- `GET /api/emergency/requests/` - 获取求助列表
- `POST /api/emergency/requests/` - 创建求助

### 学习系统
- `GET /api/learning/categories/` - 获取课程分类
- `GET /api/learning/courses/` - 获取课程列表
- `GET /api/learning/progress/` - 获取学习进度
- `POST /api/learning/progress/` - 更新学习进度

## 部署建议

### 生产环境

1. 使用 Gunicorn 作为应用服务器
2. 使用 Nginx 作为反向代理
3. 配置 HTTPS
4. 启用数据库连接池
5. 配置日志系统

### 性能优化

1. 使用 Redis 缓存热点数据
2. 优化数据库查询
3. 启用 Gzip 压缩
4. 配置合适的服务器资源

## 安全措施

1. 使用 HTTPS
2. 密码加密存储
3. JWT 认证
4. CORS 配置
5. SQL 注入防护
6. XSS 防护

## 联系方式

如有问题或建议，请联系项目维护人员。
