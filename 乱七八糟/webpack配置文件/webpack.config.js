//导出一个对象
var htmlwp = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',//指定入口文件
    output: {
        path: __dirname + '/dist',//输出路径要求是绝对路径，
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
                loader: 'style-loader!css-loader!scss-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg)$/,
                loader: 'url-loader?limit=20000'
            },
            {
                test: /.vue$/,  
                loader: 'vue-loader' 
            }
        ]
    },
    plugins: [
        new htmlwp({
            title: '首页', //生成的页面标题
            filename: 'index.html', //webpack-dev-server在内存中生成的文件名称，自动将build注入到这个页面底部，才能实现自动刷新功能
            template: 'index1.html' //根据index1.html这个模板来生成(这个文件请程序员自己生成)
        })
    ]
}

