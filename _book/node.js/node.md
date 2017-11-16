#### nodeJS
- js 是一门单线程解释执行的编程语言（js运行在js引擎内部）
- js异步原理：单线程+事件队列
- 浏览器内核包含两部分，
    + DOM渲染引擎
    + js解析引擎

#### nodejs 中的事件模型
- 单线程加事件队列
- nodejs中异步执行的任务（异步I/O）
    + 文件I/O
    + 网络I/O
- 基于事件

#### 全局对象（node中的顶级对象是global）
- `__filename`包含文件名称的全路径
- `__dirname`文件路径（不包含文件名称）
- `process` 打印进程相关信息
- `process.argv`是一个数组，默认情况下，前两项数据分别是：node.js环境的路径，当前执行的js的全路径
- `process.arch`打印当前系统构架(系统位数)
- `setTimeout`和dom中的功能相同

#### Buffer(缓冲器)
**buffer 基本操作（buffer本质上是字节对象）**

```js
//实例化buffer对象
let buf = new Buffer(4);//在内存中开辟4个空间不推荐这种方法（这种方法开辟的空间没有初始化可能包含其他敏感信息）
let buf = Buffer.alloc(4);
console.log(buf);

let buf = Buffer.from('hello');
let buf = Buffer.from([0x62,0x72])
console.log(buffer.toString());

//静态方法
Buffer.isEncoding('utf-8')//判断编码方式
Buffer.isBuffer()//判断是否为buffer
Buffer.byteLength()//字节长度
Buffer.concat()//拼接buffer

```

#### 核心模块path

```js
const path = require('path');
//获取路径的最后一部分
path.basename('/foo/bar')//bar
path.basename('/foo/bar/baz/asdf/quux.html');//quux.html
//获取路径
path.dirname('/abc/')//'/' 当前目录
//获取扩展名称
path.extname('index.html')//.html
//路径的格式化处理
path.format()//obj--string
path.parse() //string--obj
```


#### 核心模块 文件读取模块 fs 和 流 stream
- `fs.stat()`查看文件状态
- `fs.readFile()` 读文件操作
- `fs.writeFile()` 写文件操作
- `fs.createReadStream()` 读取流操作（读参数地址中的流对象）
- `fs.createWriteStream()` 写流操作（将流写到参数中的地址中）
- `fs.mkdir()` 创建目录
- `fs.redir()` 删除目录
- `fs.readdir` 读取目录中内容

```js
const fs = require('fs');
fs.stat('./data',(err,start)=>{
    //第一个参数为错误对象，如果err为null表示没有错误否则报错
    if(err) return 
    if(stat.isFile()){
        console.log('文件');
    }else if(stat.isDirectory){
        console.log('目录');
    }
    console.log(stat);

    //atime 文件访问时间
    //ctime 文件状态发生改变的时间
    //mtime 文件数据发生改变的时间
    //birthtime 文件创建时间
})

const  fs = require('fs')
const  path = require('path')
// let strpath = path.join(__dirname,'data.txt')

//异步读操作
// fs.readFile(strpath,(err,data)=>{
//     if(err) console.log(1);
//     // console.log(data);
//     console.log(data.toString());
// })

//同步读操作
// let ret = fs.readFileSync(strpath, 'utf-8')
// console.log(ret);


//异步写操作

// fs.writeFile(strpath,'hello hello hello','utf8',(err)=>{
//     if(err) return ;
//     console.log('操作完成');
// })

// 同步写
// fs.writeFileSync(strpath,'nimei','utf8')

//stream 的读写操作
let spath = path.join(__dirname,'./1','01.js')//读stream的路径
let dpath = path.join('C:\\Users\\ding\\Desktop','01.js')//路径需要用'\'转义

let readStream = fs.createReadStream(spath);
let writeStream = fs.createWriteStream(dpath);
readStream.pipe(writeStream)

//目录操作
//1.创建目录fs.mkdir(path,callback)
//async
fs.mkdir(strpath,(err)=>{
    console.log(err);
})
//sync
fs.mkdirSync(strpath,'hello')
//读取操作fs.readdir(path,callback)
//async
//files包含目录下所有文件和目录
fs.readdir(strpath,(err,files)=>{
    files.forEach((item,index)=>{
        fs.stat(path.join(strpath,item)),(err,stat)=>{
         if(stat.isFile()){
             console.log(item,"files");
         }else if(stat.isDirectory()){
             console.log(item,'dir');
         }
        }
    })
})
//删除目录fs.rmdir
fs.redir(path.join(strpath,(err)=>{
    console.log(err);
}))
```
> 模块名不能和参数名重复否则会报错

#### 核心模块http
- `req.url` 获取请求的url后缀
- `req.on('data',callback)` data按块加载事件
- `req.on('end',callback)` 加载结束后触发

##### 实例--搭建简单服务器

```js
const http = require('http')
//创建服务器实例对象 （基于事件写法）
let server = http.createServer()
//绑定请求事件
server.on('request',(req,res)=>{
res.end('hello')
})
//监听端口
server.listen(8000)
//另一种写法
http.createServer((req,res)=>{
if(req.url.startWith('/index')){
}
res.end('hi')
}).listen(8000,'',()=>{
console.log('running...')
})
//第二个参数默认是localhost可以更改为ipv4地址
```

##### 实例--获取静态资源

```js
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('./mime.json');

//创建服务 并读取文件 
http.createServer((req,res)=>{
    //读取文件信息
    //req.url 是内置方法，可以获取地址后缀
    // console.log(req.url);
    fs.readFile(path.join(__dirname,'www',req.url),(err,data)=>{
        if(err){
            //防止输出乱码
            res.writeHead(404,{
                'Content-Type':'text/plain;charset=utf8'
            })
            res.end('您要访问的页面不存在')
        }else {
            //设置初始值，解决可能存在的编码问题
            let dtype = 'text/plain';
            //获取目标文件的后缀名
            let ext = path.extname(req.url);
            if(mime[ext]){
                dtype = mime[ext];
            }
            //startsWith 判断a 是否是以 b 开头 es6语法
            //判断初始类型是否是纯文本
            if(dtype.startsWith('text')){
                dtype += '; charset=utf8';
            }
            res.writeHead(200,{
                'Content-Type':dtype
            })
            res.end(data)
        }
    })
}).listen(8000,()=>{
    console.log('正在运行');
})
```

#### 核心模块url

##### get参数处理
- `url.parse(strUrl,Boolean)` 将url字符串转化成对象格式，两个参数1，需要处理的字符串 2，true query的值为对象  false query的值为字符串
- `url.format(obj)` 将url对象转换成字符串

```js
const url = require('url');

let str = 'http://www.baidu.com/abc/qqq?flag=123&keyword=java';

let ret = url.parse(str, true)

console.log(ret);
console.log(ret.query.flag);

let obj = {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'www.baidu.com',
    port: null,
    hostname: 'www.baidu.com',
    hash: null,
    search: '?flag=123&keyword=java',
    query: 'flag=123&keyword=java',
    pathname: '/abc/qqq',
    path: '/abc/qqq?flag=123&keyword=java',
    href: 'http://www.baidu.com/abc/qqq?flag=123&keyword=java'
};
let ret1 = url.format(obj)
console.log(ret1);

//实际应用
http.createServer((req, res) => {
    let obj = url.parse(req.url, true);
    res.end(obj.query.flag + '=========' + obj.query.keyword);
}).listen(3000, () => {
    console.log('running....');
})
```

#### 核心模块querystring
- `querystring.parse(str)` 将字符串转换成对象
- `querystring.stringify(obj)` 将对象转换成字符串

```js
//建立服务
http.createServer((req, res) => {
    //判断目录获取静态资源
    if (req.url.startsWith('/www')) {
        static.staticServer(req, res, __dirname);
    }
    //获取动态资源
    if (req.url.startsWith('/login')) {
        //get 请求
        if (req.method == 'GET') {
            let parms = url.parse(req.url, true).query;
            if (parms.u_name == 'admin' && parms.psw == '123') {
                res.end('get success');
            } else {
                res.red('get fail')
            }
        }
        //post 请求
        if (req.method == 'POST') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            })
            req.on('end', () => {
                let obj = querystring.parse(data)
                if (obj.u_name == 'admin' && obj.psw == '123') {
                    res.end('post success');
                } else {
                    res.end('post fail')
                }
            })
        }

    }
}).listen(8000, () => {
    console.log('running...');
})
```

#### 获取动态网站

```js
const http = require('http);
http.createServer((req,res)=>{
    //查询成绩的入口地址
    //路由=请求路径+请求类型
    if(req.url.startsWith('/query')){
        fs.readFile(path.join(__dirname,'view','index.html'),(err,data)=>{
            if(err){
                res.writeHead(500,{
                    'Content-Type':'text/plain;charset=utf8'
                })
                res.end('服务器错误')
            }
            res.end(data)
        })
    }else if (req.url.startsWidth('/score')){
        let pdata = '';
        req.on('data',(chunk)=>{
            pdata += chunk
        })
        req.on('end',()=>{
            let param = querystring.parse(pdata);
            
        })
    }
    //获取成绩地址
})
```

#### express 框架
- http的常见请求方式：
    + get 查询
    + post 添加
    + put  更新
    + delete 删除
- restful api （一种URL的格式）
- `use(callbacck)` 直接可以处理所有的路由请求
- 实现静态资源服务器

```js
//第一个参数为虚拟地址
//可以指定多个静态资源目录
app.use('/abc',express.static('public'));
app.use('/nihao',express.static('hello'));
app.listen(3000,()=>{
    console.log('running...');
});
```

##### 路由
**根据请求路径和请求方式进行路径分发**
- `all()` 可以监控各种请求
- `all(path,callback)` 绑定的路由与请求方式无关 可以绑定路径
- `route()` 可以指定特定的请求格式

```js
app.route('/hello')
    .get((req,res)=>{
        res.send('get data')
    })
    .post((req,res)=>{
        res.send('post data')
    })
app.listen(8000,()=>{
    console.log('running.....');
})
```


##### 中间件 
- 可以访问请求对象和响应对象的中间环节（中间函数）
- 中间件的挂载方式 1，use 2，路由方式

```js
//use中间件
app.use('/',(req,res,next)=>{
    console.log(Date.now());
    next() //把请求传递给下面
})
app.use('/',(req,res,next)=>{
    console.log('访问了。。');
    next() //把请求传递给下面
})
app.use('/',(req,res)=>{
    res.send('result')
})

//路由中间件
app.get('/',(req,res,next)=>{
    console.log(1);
    // next();
    next('route')//跳转到下一个路由
},(req,res)=>{
    console.log(2);
    res.send('abc')
})
app.get('/',(req,res)=>{
    console.log(3);
    res.send('hello world')
})

//数组形式路由中间件
let app1 = function (req,res,next){
    next()
}
let app2 = function(req,res,next){
    next()
}
let app3 = function(req,res,next){
    res.send('hello world')
}
app.get('/',[app1,app2,app3])
app.listen(8000,()=>{
    console.log('running');
})
```

> 中间件执行过程不能加end或send方法

##### [bodyparse 中间件](https://github.com/expressjs/body-parser)
- 用于参数处理
- 用法

```js
const bodyParser = require('body-parser')
// 挂载内置中间件
app.use(express.static('public'));
//处理表单请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数（处理ajax请求）
app.use(bodyParser.json());

//处理post请求参数实例
app.post('/login',(req,res)=>{
    let data = req.body;
    // console.log(data);
    if(data.username == 'admin' && data.password == '123'){
        res.send('success');
    }else{
        res.send('failure');
    }
});
```

##### [art-template模板](https://aui.github.io/art-template/express/)
- 安装

```
npm install --save art-template
npm install --save express-art-template
```

- 使用

```js
const express = require('express');
const path = require('path');
const template = require('art-template');
const app = express();

// 设置模板的路径
app.set('views',path.join(__dirname,'views'));
// 设置模板引擎
app.set('view engine','art');

// 使express兼容art-template模板引擎
app.engine('art', require('express-art-template'));

app.get('/list',(req,res)=>{
    let data = {
        title : '水果',
        list : ['apple','orange','banana']
    }
    // 参数一：模板名称；参数二：渲染模板的数据
    res.render('list',data);
});

app.listen(3000,()=>{
    console.log('running...');
});
```

#### 图书管理实例

##### 纯nodejs操作数据为假数据
- 入口文件index.js

```js
/*
    图书管理系统-入口文件
*/
const express = require('express');
const path = require('path');
const router = require('./router.js');
const template = require('art-template');
const bodyParser = require('body-parser');
const app = express();

// 启动静态资源服务
app.use('/www',express.static('public'));

// 设置模板引擎
// 设置模板的路径
app.set('views',path.join(__dirname,'views'));
// 设置模板引擎
app.set('view engine','art');
// 使express兼容art-template模板引擎
app.engine('art', require('express-art-template'));

// 处理请求参数
// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数
app.use(bodyParser.json());

// 启动服务器功能
// 配置路由
app.use(router);
// 监听端口
app.listen(3000,()=>{
    console.log('running...');
});

```

- 路由文件 router.js

```js

/*
    路由模块
*/

const express = require('express');
const router = express.Router();
const service = require('./service.js');

// 路由处理

// 渲染主页
router.get('/',service.showIndex);
// 添加图书(跳转到添加图书的页面)
router.get('/toAddBook',service.toAddBook);
// 添加图书(提交表单)
router.post('/addBook',service.addBook);
// 跳转到编辑图书信息页面
router.get('/toEditBook',service.toEditBook);
// 编辑图书提交表单
router.post('/editBook',service.editBook);
// 删除图书信息
router.get('/deleteBook',service.deleteBook);

module.exports = router;
```

#### 数据库

##### 常用的命令
    + `show databases`;  ---  查看有多少数据库
        * 下面三个为系统默认的数据库
        * information_schema
        * performance_schema
        * mysql
    + `select database()`; 查看当前正在使用的数据库
        * Null 为当前没有正在使用的数据库
    + `use 数据库名称`   --- 表示使用某个数据库
    + `show tables`  --- 查看表
    + `desc book`  --- 打开表，查看表的结构
    + `select * from 表的名称`  ---  查看表中的数据


##### 界面
    + 主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据
    + 用来唯一区分一行的记录
- 不是Null
    + 选择之后，必须填充数据


##### 基础语句

- 插入数据
    + insert into 表名 ( field1, field2,...fieldN ) values ( value1, value2,...valueN );
    + insert into user (username, password, age) values ('qianer', '12345', 14);

- 删除数据
    + DROP TABLE table_name ;
    + delete from user where id = 5

- 更新数据
    + update table_name SET field1=new-value1, field2=new-value2 [WHERE Clause]
    + update user set username = 'zhengqi' where id = 1;

- 查询数据
    + SELECT column_name,column_name FROM table_name [WHERE Clause] [OFFSET M ][LIMIT N]
    + select * from user
    + select username from user where id = 2;

- 操作数据库基本步骤
```js
// 加载数据库驱动
const mysql = require('mysql');
// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost', // 数据库所在的服务器的域名或者IP地址
    user: 'root', // 登录数据库的账号
    password: '', // 登录数据库的密码
    database: 'book' // 数据库名称
});
// 执行连接操作
connection.connect();
// 操作数据库
//插入操作
let sql = 'insert into book set ?'
let data = {
    name:'',
    author:'',
    category:'',
    description:''
}
//更新操作
let sql = 'update book set name = ?,author=? category=? description=? where id = ?'
let data = ['三国演义'，'','','',1]
//删除操作
let sql = 'delete from book where id = ?';
let data = [1];
//查询操作
//1
let sql = 'select*from book';
let data = null;
//2
let sql = 'select*from book where id = ?'
let data = [3]
//查看有多少条信息
connection.query(sql,data, function(error, results, fields) {
    if (error) throw error;
    console.log(results);
    //查询输出
    console.log(results[0].name);
    if(results.affectedRows == 1){
        console.log('插入成功');
    }
});
// 关闭数据库
connection.end();

```