# 需求说明,API说明
1. 根据客户端传递过来的不同的参数(状态,页码)查询任务列表
2. 实现新增一个任务功能(名称,截止日期,内容)
3. 实现一个编辑的功能:根据客户端传递的任务对象(已经存在的数据)进行编辑,(名称,截止日期,内容,id)
4. 删除一个任务(id)
5. 修改任务的状态(id,状态->待办/完成)

# API 实现

## 数据库的初始化
1. 创建一个数据库
2. 使用`sequelize-cli` 初始化 项目的 数据库配置信息
  `npx sequelize-cli init`
3. 生成模型文件
  1. migrate文件
  2. model文件
  `npx sequelize-cli model:generate --name Todo --attributes name:string,deadline:date,content:string`

  表的名称 --attributes 属性
  4. 持久化,模型对应的[数据库表]
  生成对应的数据库表
  `npx sequelize db:migrate`

## API里面具体使用ORM模型
1.写对应的请求

## 项目的发布和运维
PM2 工具

启动命令/运维命令/运维文档
1. pm2 start ecosystem.config.js
2. pm2 log
3. pm2 restart ecosystem.config.js