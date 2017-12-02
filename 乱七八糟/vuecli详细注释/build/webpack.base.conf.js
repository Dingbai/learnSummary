'use strict'

/*
  从代码中看到，dev-server使用的webpack配置来自build/webpack.dev.conf.js文件（
  测试环境下使用的是build/webpack.prod.conf.js，这里暂时不考虑测试环境）。
  而build/webpack.dev.conf.js中又引用了webpack.base.conf.js，所以这里我先分析webpack.base.conf.js。
  
  webpack.base.conf.js主要完成了下面这些事情：
  
    1、配置webpack编译入口
    2、配置webpack输出路径和命名规则
    3、配置模块resolve规则
    4、配置不同类型模块的处理规则

  说明： 这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，
         如果需要处理其他文件可以在module.rules里面另行配置。
*/


const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// 获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // webpack 入口文件
  entry: {
    app: './src/main.js'
  },
  // webpack 输出打包好的文件路径以及命名规则
  output: {
    // webpack 输出路径和命名规则
    path: config.build.assetsRoot,
    // webpack 输出 打包后文件的名称
    filename: '[name].js',
    // webpack 编译输出的发布路径（例如'//cdn.xxx.com/app/'）
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 模块 resolve 的规则
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 别名，方便引用模块，例如有了别名之后，
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // 不同类型模块的处理规则，使用不同的 loader
  module: {
    rules: [
      {
        test: /\.vue$/, 
        loader: 'vue-loader',  // 对所有.vue文件使用vue-loader进行编译
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', // 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader', // 对ulr以及图片资源文件使用url-loader
        options: {
          // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的图片转移到静态资源文件夹
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader', // 对多媒体资源文件使用url-loader
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader', // 对字体资源文件使用url-loader
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
