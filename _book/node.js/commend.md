#### 常用命令
- sysdm.cpl 打开环境变量
- write 写字板

#### cmd常用命令
- md新建
- cd切换盘符
- rd 删除目录（必须时空文件夹） rd /s/q 文件名 不需要空文件夹
- d:直接跳转到d
- ls 列表
- rm 删除命令（文件夹）
- echo on > 文件名创建文件
- echo 123 >文件名，向文件中添加123
- echo 234 >> 文件名，追加
- cat 文件名 查看文件内容
- cat > 文件名 会显示添加环境在其中添加即可，追加和echo相同
- rm 文件名 删除文件内容

#### node环境配置
- nvm 环境配置（node包管理工具）
- 配置nvm必须删除node安装包
- 在c盘中创建dev目录 dev下创建node，nvm文件夹并将nvm包解压到nvm文件夹中 以管理员身份运行install.cmd生成配置文件，另存在当前目录并修改，root，path配置，配置到当前目录，之后配置环境变量

#### 启动node环境
- node在命令行中环境叫REPL read-eval-print-loop 读取代码执行打印循环这个过程
- 在repl中`_`表示最后一次执行结果`.exit`退出repl环境
- 可以通过node+js文件名在node环境中运行js文件