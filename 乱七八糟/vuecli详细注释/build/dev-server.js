'use strict'
/*
  首先来看执行”npm run dev”时候最先执行的build/dev-server.js文件。该文件主要完成下面几件事情：
  
  1、检查node和npm的版本、引入相关插件和配置
  2、webpack对源码进行编译打包并返回compiler对象
  3、创建express服务器
  4、配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
  5、挂载理服务和中间件代
  6、配置静态资源
  7、启动服务器监听特定端口（8080）
  8、自动打开浏览器并打开特定网址（localhost:8080）
  
  说明： express服务器提供静态文件服务，不过它还使用了http-proxy-middleware，一个http请求代理的中间件。
         前端开发过程中需要使用到后台的API的话，可以通过配置proxyTable来将相应的后台请求代理到专用的API服务器。
*/

// 检查NodeJS 和 npm 版本
require('./check-versions')()

// 获取配置信息
const config = require('../config')
// 如果 Node 的环境变量中没有设置当前的环境(NODE_ENV), 则使用config中的dev环境配置当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// opn是第三方模块， 是一个可以调用默认软件打开网址、图片、文件等内容的插件
// 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8080
const opn = require('opn')
// path 是 Node 核心模块， 提供了路径的操作功能
const path = require('path')
// 引入node框架，expess ，快速搭建 node 服务
const express = require('express')
// webpack
const webpack = require('webpack')
// proxyMiddleware 是 express中间件，用于将 http 请求代理到其他服务器
// 例：localhost:8080/api/xxx  -->  localhost:3000/api/xxx
// 这里使用该插件可以将前端开发中涉及到的请求代理到提供服务的后台服务器上，方便与服务器对接
const proxyMiddleware = require('http-proxy-middleware')
// 开发环境下的webpack 环境
const webpackConfig = require('./webpack.dev.conf')

// dev-server 监听的端口，如果没有在命令行传入端口号， 则使用config.dev.port设置的端口， 例如8080
const port = process.env.PORT || config.dev.port
// 用于判断是否要自动打开浏览器的布尔变量，当前文件中没有设置自定打开浏览器的时候其值为 false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// HTTP代理表，指定规则，获取需要代理的服务api，将某些API请求代理到相应的服务器
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

// 创建express服务器
const app = express()
// webpack根据配置开始编译打包源码并返回compiler对象
const compiler = webpack(webpackConfig)

// webpack-dev-middleware将webpack编译打包后生成的项目文件存放在内存中而没有写进磁盘，不去读写硬盘，
// 将这个中间件挂载到express上使用之后即可提供这些编译后的产品文件服务
// 当文件被改动的时候，不会刷新页面就会部署成功  
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  // 设置访问路径为webpack配置中的output里面所对应的路径
  publicPath: webpackConfig.output.publicPath,
  // 设置为true，使其不要在控制台输出日志
  quiet: true
})


// webpack-hot-middleware，用于实现热重载功能的中间件
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  // 关闭控制台的日志输出
  log: false,
  // 发送心跳包的频率，即多长时间自己刷新浏览器
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// 挂载热重载中间件
app.use(hotMiddleware)

// 根据 proxyTable 中的代理请求配置来设置express服务器的http代理规则
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  // 格式化options，例如将'www.example.com'变成{ target: 'www.example.com' }
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 重定向不存在的URL，用于支持SPA（单页应用）
// 例如使用vue-router并开启了history模式
app.use(require('connect-history-api-fallback')())

// 挂载webpack-dev-middleware中间件，提供webpack编译打包后的产品文件服务
app.use(devMiddleware)

// 提供static文件夹上的静态文件服务
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 启动服务后，打开的域名以及端口号
const uri = 'http://localhost:' + port

// 创建promise，在应用服务启动之后resolve
// 便于外部文件require了这个dev-server之后的代码编写
var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')

// webpack-dev-middleware等待webpack完成所有编译打包之后输出提示语到控制台，表明服务正式启动
// 服务正式启动才自动打开浏览器进入页面
devMiddleware.waitUntilValid(() => {
  // portfinder 用于获取 port
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    // 启动express服务器并监听相应的端口
    server = app.listen(port)
    _resolve()
  })
})

// 暴露本模块的功能给外部使用，例如下面这种用法
// var devServer = require('./build/dev-server')
// devServer.ready.then(() => {...})
// if (...) { devServer.close() }
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
