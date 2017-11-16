### 1.将绝对路径改为相对路径
    path:'E:\wamp\www\day 81\打包JS\dist';
    path: __dirname + '/dist';

### 2.webpack(资源打包工具)的介绍
>   注:  webpack和gulp类似  =>代码压缩,合并;
>        git   =>代码版本管理
    1> 将css,less,sass,js,img等静态文件当作一个模块打包,且每一种模块通过对应的loader来实现;
>   注:将webpack当作一个框架,而loader当作模块来理解
    2>  webpack 1.0版本官网：https://webpack.github.io/docs/usage.html
        webpack 2.0版本官网：https://webpack.js.org/

### 3.安装npm
    1> npm是基于node,故先安装node( https://nodejs.org/en/ )
    2> npm由于墙,故下载 nrm(npm registry) ,用于管理下载源 npm install nrm -g
>   注: nrm ls => 查看当前的下载源,
>       nrm use taobao =>切换下载源为taobao
    3> 也可安装 cnpm(淘宝镜像npm,用其代替npm) npm install cnpm -g 

### 4.webpack.config.js和webpack指令
    1> webpack 入口文件名.js 输出文件名.js
    2> webpack.config.js(若在DOS窗口值输入webpack,则默认寻找webpack.config.js,这个文件可配置入口文件,输出文件,插件和loader)
        var htmlWp = require('html-webpack-plugin');
        module.exports = {
            entry: './src/main.js',
            output: {
                path: __dirname + '/dist',
                filename: 'build.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.css$/,
                        loader: 'style-loader!css-loader'
                    },
                    {
                        test: /\.scss$/,
                        loader: 'style-loader!css-loader!sass-loader'
                    },
                    {
                        test: /\.less$/,
                        loader: 'style-loader!css-loader!less-loader'
                    },
                    {
                        test: /\.(png|gif|ttf)$/,
                        loader: 'url-loader?limit=20000'
                    }
                ]
            },
            plugins: [
                new htmlWp({
                    title: "首页",
                    filename: 'index.html',
                    template: 'index1.html'
                })
            ]
        }
>   注:在使用loader之前需要 npm init -y ,生成package.json文件以便于保存各插件及loader版本信息;

### 5.webpack打包css步骤(less,sass类似):
    1> 下载loader模块 npm i css-loader style-loader --save-dev
    2> 在webpack.config.js中配置
        module:{
            loaders:[
                {
                    test:/\.css$/,
                    loader:'style-loader!css-loader'
                }
            ]
        }
    3> 将css文件导入到main.js中
        require('../css/index.css');
    4> 在html中引入main.js文件
    5> DOS中运行webpack即可;

### 6.webpack打包好含有url资源
    1> 下载loader模块   
        npm install url-loader file-loader --save-dev
    2> 在webpack.config.js 中配置
        {
            test:/\.(png|jpg|gif)$/,
            loader:'url-loader?limit=20000'
>           注:limit限制文件的大小为20k;
>           1> 图片小于20k,则将图片以base64格式保存在build.js中;
>           2>大于20k,则路径打包在build.js中,图片在磁盘上;
        }
    3>由于url在css文件中,故引入css文件就行
    4>在html中引入main.js文件
    5>DOS中运行webpack即可;

### 7.webpack配置server步骤(实现热加载,即浏览器自动刷新,且能加载较大内存的图片,即大于20K)
    1>cnpm install webpack@1.14.0 webpack-dev-server@1.16.0 html-webpack-plugin --save-dev
    2>在package.json中配置
        "scripts": {
            "dev": "webpack-dev-server --hot --open --inline --port 4009"
        },
    3>在webpack.config.js中配置
        var htmlWp = require('html-webpack-plugin');
        plugins: [
            new htmlWp({
                title: "首页",
                filename: 'index.html',
                template: 'index1.html'
            })
        ]
>       注:plugins和module同级;
    4>将原来的index.html改为index1.html;
    5>在DOS窗口打入 npm run dev即可;

>  npm install vue-loader --save-dev 开发时候依赖的包
>  npm install vue --save 开发,线上都依赖的包


### 8.查看webpack版本方法(安装yarn后) npm install yarn -g
     yarn info webpack 

### 9.在webpack中将ES6语法转换成ES5语法步骤
    1> 下载loader插件   =>npm install babel-core babel-loader babel-preset-es2015 babel-plugin-transform-runtime  --save-dev
    2> 在webpack.config.js中配置
        loader:{
            test:/\.js$/,
            loader:'babel-loader',
            exclude:/node_modules/
        }
        另外:
        babel:{
            presets:['es2015'],
            plugins:['transform-runtime']
        }
    3> main.js中之前是5,则改成ES6语法:
        import '../statics/css/site.css'

### 10.在webpack中解析.vue文件