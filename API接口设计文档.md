手语翻译系统 - API接口设计文档
 
一、基础信息
 
- 后端框架：Django + DRF

- 数据格式：JSON

- 统一返回格式：

 {
  "code": 状态码,
  "msg": "提示信息",
  "data": 返回数据
}
 
 
 
 
二、接口列表
 
1. 服务健康检查接口
 
- 接口地址： /api/health/ 

- 请求方式：GET

- 功能：测试服务器是否正常运行

- 无请求参数

- 返回示例：

{
  "code": 200,
  "msg": "服务运行正常",
  "data": null
}
 
 
 
 
 
2. 用户注册接口
 
- 接口地址： /api/user/register/ 

- 请求方式：POST

- 请求参数：
 
 {
  "username": "用户名",
  "password": "密码",
  "email": "邮箱（可选）"
}
 
- 返回示例：

  {
  "code": 200,
  "msg": "注册成功",
  "data": null
}
 
 
 
3. 用户登录接口
 
- 接口地址： /api/user/login/ 

- 请求方式：POST

- 请求参数：
 
 {
  "username": "用户名",
  "password": "密码"
}
 
- 返回示例：
 
 {
  "code": 200,
  "msg": "登录成功",
  "data": {
    "user_id": 1,
    "username": "test"
  }
}
 
 
 
4. 手语视频翻译接口
 
- 接口地址： /api/translate/ 

- 请求方式：POST

- 请求参数：
 {
  "user_id": 1,
  "video_file": "上传的视频文件"
}
 
 
- 返回示例：
 
 {
  "code": 200,
  "msg": "翻译完成",
  "data": {
    "result": "你好，很高兴见到你",
    "create_time": "2026-03-19 12:00:00"
  }
}
 
 
 
5. 翻译记录查询接口
 
- 接口地址： /api/translate/record/ 

- 请求方式：GET

- 请求参数： user_id 

- 返回示例：

{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "id": 1,
      "result": "你好",
      "create_time": "2026-03-19"
    }
  ]
}