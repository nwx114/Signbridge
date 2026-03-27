（-- SignBridge 智能手语交流平台数据库设计 (MySQL版本) - 简化版

-- 创建数据库
CREATE DATABASE IF NOT EXISTS signbridge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE signbridge;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    language_preference VARCHAR(10) DEFAULT 'zh',
    bio TEXT,
    level INT DEFAULT 1,
    completed_courses INT DEFAULT 0,
    learning_hours INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 翻译历史表
CREATE TABLE IF NOT EXISTS translation_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT NOT NULL,
    translation TEXT NOT NULL,
    source_language VARCHAR(10) DEFAULT 'sign',
    target_language VARCHAR(10) DEFAULT 'zh',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 课程分类表
CREATE TABLE IF NOT EXISTS course_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 课程表
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(20) NOT NULL,
    category_id INT,
    duration INT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES course_categories(id) ON DELETE SET NULL
);

-- 学习进度表
CREATE TABLE IF NOT EXISTS learning_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    course_id INT,
    progress INT DEFAULT 0,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    UNIQUE KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 论坛分类表
CREATE TABLE IF NOT EXISTS forum_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 论坛帖子表
CREATE TABLE IF NOT EXISTS forum_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INT,
    category_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    replies_count INT DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES forum_categories(id) ON DELETE SET NULL
);

-- 论坛回复表
CREATE TABLE IF NOT EXISTS forum_replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    author_id INT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    likes INT DEFAULT 0,
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 紧急求助类型表
CREATE TABLE IF NOT EXISTS emergency_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 紧急求助表
CREATE TABLE IF NOT EXISTS emergency_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type_id INT,
    location TEXT,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (type_id) REFERENCES emergency_types(id) ON DELETE SET NULL
);

-- 活动记录表
CREATE TABLE IF NOT EXISTS user_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    activity_type VARCHAR(50) NOT NULL,
    activity_content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 插入初始数据
INSERT INTO course_categories (name, description) VALUES
('基础入门', '适合初学者的基础手语课程'),
('日常生活', '日常生活中常用的手语表达'),
('职场沟通', '职场环境中的手语表达'),
('紧急情况', '紧急情况下的手语表达'),
('高级表达', '复杂的手语表达技巧');

INSERT INTO forum_categories (name, description) VALUES
('手语学习', '关于手语学习的讨论'),
('翻译技巧', '手语翻译的技巧和经验'),
('文化交流', '手语文化和交流'),
('设备讨论', '手语相关设备的讨论'),
('就业信息', '手语相关的就业信息'),
('其他话题', '其他相关话题');

INSERT INTO emergency_types (name, description) VALUES
('医疗紧急', '需要医疗救助的紧急情况'),
('安全紧急', '需要警方或安全相关的紧急帮助'),
('消防紧急', '需要消防部门的紧急救援'),
('一般求助', '其他类型的紧急帮助');

INSERT INTO courses (title, description, level, category_id, duration) VALUES
('手语基础入门', '学习手语的基本手势和表达方式，掌握日常问候和简单交流', '初级', 1, 10),
('日常生活用语', '学习日常生活中常用的手语表达，包括家庭、饮食、购物等场景', '初级', 2, 15),
('职场沟通技巧', '学习职场环境中的手语表达，包括会议、汇报、团队合作等场景', '中级', 3, 12),
('紧急情况表达', '学习紧急情况下的手语表达，包括求助、医疗、安全等场景', '中级', 4, 8),
('高级表达技巧', '学习复杂的手语表达，包括抽象概念、情感表达、故事讲述等', '高级', 5, 18),
('手语文化与历史', '了解手语的文化背景和历史发展，深入理解手语的社会意义', '高级', 5, 10);
