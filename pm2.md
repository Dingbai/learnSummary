### pm2 入门
[pm2官方文档](https://pm2.io/doc/en/runtime/guide/process-management/?utm_source=github)

[参考资料](https://blog.csdn.net/maquealone/article/details/79550120)
#### pm2 简单介绍
P(rocess)M(anager)2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等
#### 安装pm2 
`npm install pm2 -g`
#### pm2 用法
1. 启动应用 `pm2 start app.js`
    > `--watch` 监听应用目录的变化，一旦发生变化，自动重启
2. 列出所有应用 `pm2 list`
3. 停止应用 `pm2 stop     <app_name|id|'all'|json_conf>`
4. 重启应用 `pm2 restart  <app_name|id|'all'|json_conf>`
5. 删除应用 `pm2 delete   <app_name|id|'all'|json_conf>`
6. 查看某个进程详细信息 `pm2 describe id`
7. 监控某个进程状态 `pm2 monit`
8. 查看日志 `pm2 logs` 
   > `pm2 logs APP-NAME       # 以app-name格式输出 `
   > `pm2 logs --json         # JSON output `
   > `pm2 logs --format       # Formated output `
   > `pm2 flush               # Flush all logs `
   > `pm2 reloadLogs          # Reload all logs `
9. `npm install pm2@latest -g` 下载最新版 
10. `pm2 update` 无缝更新pm2 
