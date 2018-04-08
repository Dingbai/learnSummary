**此分析主要内容学习自[艾伦博客源码分析](http://www.cnblogs.com/aaronjs/p/3278578.html)**
### (一)juqery 的无 `new` 构建
- 正常构造函数写法
```js
let fn = function(){
    context...
}
fn.prototype = {
    name:'zhangsan',
    age:19
}
let f = new fn();
f.name //zhangsan
```
- 我们平常调用jquery时直接`jquery.css()`不需要创建jquery实例
```js
//用递归调用返回fn实例
let fn = function(){
    return fn.prototype.init();//因为this指向的是fn实例 所以fn的返回值也是fn实例 
}
fn.prototype = {
    init:function(){
        return this; //this指向fn实例
    },
    name:'zhangsan',
    age:18
}
fn().name//zhangsan
//当init函数作为一个构造器时上述代码就会出现问题，
fn.prototype = {
    init:function(){
        this.age = 20 //等于想fn实例添加一个age属性
        return this; //this指向fn实例
    },
    name:'zhangsan',
    age:18
}
fn().age//20 为什么会是20,因为this.age中的this和return的this指向的同一个实例 相当于在一个作用域
//用new关键字改变this的指向就可以分离作用域
let fn = function(){
    return new fn.prototype.init();
}
//init中的this只指向有new关键字创建的空对象
fn().name//undefine，因为init中没有name属性
//如果把init的原型对象覆盖成fn的原型对象那么，fn中的方法就能正确引用了
fn.prototype.init.prototype = fn.prototype;
fn().name//zhangsan
```
### (二)链式调用
**核心:扩展原型，将要调用的函数当做jquery实例的原型方法然后返回的this就会指向jquery实例**
```js
f.name().sing()//想要实现
let fn = function (){
    context...
}
fn.prototype = {
    name:function(){
        console.log(1)
        return this;
    },
    sing:function(){
        console.log(2)
        return this;
    }
}
let f = new fn();
f.name().sing()//1,2
//缺点，函数必须有返回值否则断链
```
### (三)接口扩展
- `jquery.extend` 对jquery函数本身进行扩展
- `jquery.fn.extend` 对jquery.fn进行扩展
> `jquery.fn = jquery.prototype`  相当于同种方法的不同引用