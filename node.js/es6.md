#### es6 常见语法总结

##### 变量声明
- let
    + 声明的变量不存在预解析
    + 不允许重复声明相同变量
    + 可以声明块级作用域(只要在花括号内部用let就能形成块级作用域)

- const
    + 必须初始化
    + 不允许重复赋值
    + let 的特性同样适用于 const

> 暂时性死区：用let声明上面的函数访问不到下面的变量，称上面的部分为暂时性死区

#### 模块化相关的规则
- 定义模块：一个js文件就是一个模块，模块内部成员相互独立
- 模块成员的导出和引入

```js
//引入模块
var module = require();
//导出模块
// 1用于导出单个成员的情况，
exports.module = module;
//2用于导出的成员较多的情况，
module.exports = module;
//模块成员的导入最终以module.exports为准
//exports与module的关系
module.exports = exports = {}

//如果把变量放在global对象上，导入时不需要返回值直接global.属性/方法 即可

//导入时模块文件后缀可以省略
// 模块文件后缀的3种情况：.js, .json, .node
//上述三种模块加载的优先级 .js>.json>.node

```
#### exports 和 module exports区别
- exports是modul exports的底层实现

##### 解构
- 数组解构

```js
var [a,b,c] = [1,2,3];
var [a,b,c] = [,1,]//undefined,1,undefined
var [a=2,b,c] = [,1,3]//2,1,3

```

- 对象解构(根据对象名称赋值，与顺序无关)

```js
var [fn,foo] = {fn:"hello",foo:"hi"}
var [fn:lala,foo] = {fn:"hello",foo:"hi"}
console.log(lala,foo);//lala相当于别名，取代了fn的作用，fn将失效
var [random,floor] = Math
console.log(typeof random);//function
console.log(typeof floor);//function
```
- 字符串解构（实际上还是数组赋值和对象赋值）

```js
var [a,b,c,d,e] = "hello";//h,e,l,l,o
var [a,b,c] = "hello"//如果前后数量不一样后面的字符江北省略或undefined
var {length} = "hi" //获得字符串长度

```

##### 字符串扩展
- include()判断字符串中是否包含括号中的子串 返回Boolean 两个参数1，要匹配的值，参数2，从第几个开始匹配
```js
console.log('hello'.include('o',2));//true
```
- startsWith() 判断子串是否已特定的子串开始 
```js
console.log('hello/hi'.startsWith('hello'));
```
- endsWith()判断子串是否已特定的子串结束
- 模板字符串以` `` `包裹${}插值相当于字符串拼接

##### 函数扩展
1. 参数默认值

```js
function foo(para ='hi'){
    console.log(para);
}
foo()
foo('hello')
```

2. 参数结构赋值

```js
function  foo(uname="zhangsan",age=19){
    console.log(uname,age);
}
foo("lisi",29)

function foo({uname='zhangsan',age=19}={}){
    console.log(uname,age);
}
foo({uname:'lisi',age:19})
```

3. rest参数(剩余参数)

```js
function foo(a,b,...para){
    console.log(a);
    console.log(b);
    console.log(para);//[3,4,5]
}
foo(1,2,3,4,5)
```

4. ... 扩展运算符

```js
//需求把数组中的值分别传给函数参数
function foo(a,b,c){
    console.log(a+b+c);
}
//原来做法
let arr = [1,3,5]
foo.apply(null,arr);
//扩展写法
foo(...arr)
//合并数组
let arr1 = [1]
let arr2 = [1]
let arr3 = [...arr1,...arr2]
console.log(arr3);
```

##### 类与继承

```js
//类
class Animal{
    //静态方法（静态方法只能通过类名调用）
    static showInfo(){
        console.log('hi');
    }
    //构造函数
    constructor(name){
       this.name = name;
    }
    showName(){
        console.log(this.name);
    }
}
//继承extends
function Dog extends Animal{
    constructor(name,color){
        super(name)//super用来调用父类
        this.color = color;
    }
    showColor(){
        console.log(this.color);
    }
}
let d = new Dog('huanghuang','yellow')
d.showName();
d.showColor();
Dog.showInfo()
```