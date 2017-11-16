### npm
- node package manager
- 管理项目的依赖包
- 可以用来下载我们需要使用的东西
- 安装后可以通过`npm -v` 查看版本

### npm 使用
- 1.初始化操作
    + `npm init` 会生成一个package.json文件
- 2.下载所需要的包
    + `npm install jquery`  下载jquery
    + 会去 registry.npmjs.org 这个地址下载jquery
    + 会生成一个node_modules目录，下载的内容就放在这个目录

- 3.下载包时，可以加上 `--save` 参数

 `npm install jquery --save`, 下载之后会在package.json中添加（在项目中用同样的package.json以达到包版本一致的目的）当前下载的包的版本信息。
- npm i @版本号
- npm i 如果没有指定版本号默认安装最新版本
- npm update 更新版本(默认更新到最新版本)
- 关于package.josn
	- `main` 包的入口，可以通过`node .`运行
	- `script` 中可以自定义运行模式
```
"start":"node main.js"
//上述代码可以通过npm run start 运行
```

>  **--save-dev  和 --save 的区别**
> --save-dev 是你开发时候依赖的东西（比如谷gulp），--save 是你发布之后还依赖的东西（比如jquery，bootstrap）。

### yarn
fecebook 出品的包管理工具 功能类似于npm不过性能更加优越
安装yarn `npm i yarn`
**常用命令**
1. 初始化包`yarn init`
2. 安装包`yarn add xxx`
3. 移除包`yarn remove xxx`
4. 更新包`yarn upgrade xxx`
5. 安装开发依赖的包`yarn add xxx --dev`
6. 全局安装`yarn global add xxx`
7. 设置下载镜像的地址`yarn config set registry url`
8. 安装所有依赖`yarn install`
9. 执行包`yarn run`