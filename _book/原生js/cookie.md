### cookie

```js
//特性
//cookie是HTTP协议自带的属性在发送HTTP请求的同时会触发cookie，
//cookie可以与后台进行交互不支持跨域
//cookie默认在会话后消失一般和服务端session配合使用
//读写设置参数为以等号相连的以逗号分隔的键值对
document.cookie= 'key=val'
//属性
//设定保存到什么时候
document.cookie = 'key=val; expires' +newDate('2017-1-1');
//设置保存多久
document.cookie = 'key=val; max-age' +30;
//cookie的访问级别设置的cookie只有在cookie当前所在的文件夹及其子文件夹下才能访问设置path路径可以解决
document.cookie = 'key=val; path=/';
//允许共享主机
document.cookie = 'key=val; domain=';
//设置安全属性
//在发送https时设置该属性
document.cookie = 'key=val' + secure=true;

```
