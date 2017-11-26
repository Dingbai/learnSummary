## Ajax

## 服务器和ajax

### 客户端和服务器(都是计算机)

- 客户端 主要用于不同上网用户
- 服务器 主要给上网用户提供后台服务

### 网络相关概

- IP地址（唯一的确定互联网上的一台计算机,网络上自动分配,位置不同不断改变）可以通过将网络上ip地址放到本地的方式屏蔽网站
- 域名 IP地址的别名，方便记忆
- DNS 用于维护IP地址与域名的关系
- 端口 用来确定计算机上的网络应用程序(计算机支持0-65535的端口,一般0-1024端口是系统自己使用的不推荐使用)

### 通信协议

通信双方约定的规则
- http/https 超为本传输协议
- ftp 文件传输协议
- smpt/pop3 邮件收发协议
......

c/s 客户端到服务器(后台人员制作)
b/s 浏览器到服务器(前端人员制作)
更改apache中配置
DocumentRoot更改源文件路径
是否允许别人访问你的地址：deny 不允许，allow允许
VirtualHosts虚拟主机

### 通过ajax发送请求

使用Ajax发送请求需要如下几步
1. 创建XMLHttpRequest对象

```js
 var xhr = null;
    //创建 xhr 对象 
 if (window.XMLHttpRequest) {
	  xhr = new XMLHttpRequest();
  } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');//兼容ie6
   }
   console.log(xhr.readyState----'1')//0 初始化完成(创建完成)
```

2. 准备发送
**get请求**

```js
	var parameter = 'username'+name+'password'+pw;
	//encodeURI()是对中文参数进行编码
	xhr.open('get','./check.php?'+encodeURI(parameter),true);
	//参数
	//1 请求方式 (常用,get获取数据.post提交数据)
	//2 请求地址
	//3 同步或异步标志位,默认是true 异步false同步(一般不会使用)
	//如果是get请求name请求参数必须在URL中在URL中传递
```

 
**post请求**
	
3. 执行发送动作
**get 发送方式**

```	js
	xhr.send(null);
	//get请求在这里需要添加null;(有的浏览器在这里必须加null)
```		

**post发送方式**

```js
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//发过去的文件是键值对的格式,
xhr.send(parameter);//post参数不需要转码必须设置请求头信息,不然穿不出去
```

4. 指定回调函数

```js
console.log(xhr.readyState----'2')//1 已经发送请求
//该函数调用的条件是readyState发生了改变
xhr.onreadystatechange=function(){
if(xhr.readyState==4){
	console.log(xhr.readyState----'3')//
	/*
	2 浏览器已经收到服务器响应的数据
	3 正在解析数据
	4 数据已经解析完成 可以使用了 但是数据不一定是正常的
	*/
	if (xhr.status == 200) {   
	//状态码
	/*
	200表示响应成功
	404没有找到服务器
	500服务器错误
	403网页没有授权
	*/
        alert(xhr.responseText)
        //xhr.responseText;
    }
  }
}
```

**回调函数详解**

```js
 xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
      if (xhr.status == 200) {
	      alert(xhr.responseText);
         }
     }
  }
```

### 什么是XML
- 表头格式

```js
<? xml version="1.0" encoding="urf-8"?>
```

- XML 简介
1. XML指可扩展的标记语言
2. 主要用来输出和存储数据 --- 注意：设置宗旨是【传输数据】，而非显示数据
3. XML标签没有预定义，需要自行定义标签 --- 就是说XML具有自我描述性

- XML 数据格式的缺点
1. 元数据占用的数据量比较大，不利于大量数据的网络传输
2. 解析不太方便
- XML和HTML的区别
1. XML是用来传输和存储数据的，而HTML被设计是用来显示数据的
2. XML旨在传输数据，HTML旨在显示信息
- XML的树结构
1. XML 文档形成了的也是一种“树结构”，
2. **【XML文档必须包含根元素】**。该元素是所有其他元素的父元素。树结构从根部开始，扩展到最低端
- XML的语法
1. 所有XML元素都必须都闭合标签
2. XML标签对大小写敏感，因此必须使用相同的大小写来编 写打开标签和关闭标签
3. XML必须正确地嵌套
4. XML 文档必须有根元素
5. XML 的属性值须加引号
6. XML 中的注释 --- \<!-- … -->
7. 在 XML 中，空格会被保留
8. 一些特殊符号需要用实体引用

### json

-  json数据与不同js对象的区别
	-  json数据没有变量
	-  json形式的数据结尾没有分号
	-  json形式的键必须要用双引号包住
JSON.stringify(obj)//把对象转成字符串
JSON.parse(str)//把字符串转成对象
eval("("+date+")")//把字符串转成对象(不安全,不常用);

### 单线程与事件队列
实践队列中的任务执行条件
1. 主线程已经空闲
2. 任务满足触发条件
	1. 定时函数(延时时间已经达到)
	2. 事件函数(特定事件被触发)
	3. ajax回调函数(服务端有数据响应)



