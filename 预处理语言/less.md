# less用法

```css
/*注释的区别,会编译在css 文件中*/
// 不会编译在css中

    /*怎么声明一个变量*/
    @mainColor:red;
    //使用变量
    body {
    /*主题色*/
    color:@mainColor;}
    /*什么是Mixin混入*/
    .redFont {
		    color:red;}
    .redFontBorder {
		    border:1px solid red;}
    
    /*红色文字和边框  通过class混合*/
    
    .redFontBorder {
		    .redFont();
		    .redBorder();}
    
    /*方法 不能和css类名重复,否则会同时调用*/
    
    .redFont-func(){
				    color:red;}
    .redBorder-func(){
				    border:1px solid red;}
                    
    /*红色文字和边框 通过func 混合*/
    .redFontBorder-func {
		    .redFont-funct();
			.redBorder-func();}
    
    /*嵌套*/
    /*支持各种选择器*/
    .one {
	    .two{
		    .three{}
		    &:hover {
		    }
	    }
	    
	/*导入 import*/
	    
	    @import "color";
	    .colorI {
		    color:@red;}
	
	/*运算*/	   
	 
	     @red:red*2;   /*十六进制运算*/
```

> **Tips** less可以直接在浏览器中应用 添加js插件,不建议使用


```css
//变量
test_width:600px;
.box {
    width:@test_width;
    // background-color: yellow;
    .border;
}
//混合,可带参数
.border {
    border: 5px solid black;
}
.border_01(@border_width){
    border:@border_width solid black;
}
p {
    .border_01(30px)//自定义参数
}
.border_02(@border_width:20px){
    border:@border_width solid black;
}
p {
    .border_02();//设置默认参数
}
//混合实例
.border-radius(@radius:4px){
    -webkit-border-radius:@radius;
    -moz-border-radius:@radius;
    border-radius:@radius;
    //处理兼容
}
.radius_test{
    .border-radius(20px);
}
//匹配模式
.triangle(top,@w:5px,@c:#ccc){
    border-width:@w;
    border-color:transparent transparent @c transparent;
    border-style:dashed dashed solid dashed;
}
.triangle(@_,@w:5px,@c:#ccc){
    width: 0;
    height: 0;
    overflow: hidden;
};
.box {
    .triangle(top,20px,black);
}

.position(f){
    position: fixed;
}
.box{
    .position(f);
}
//计算
test_1:30px;
.box1 {
    width: 200px+20;
}
//嵌套
.box2 {
    width: 200px;
    height: 200px;
    p {
        font-size: 20px;
        &:hover{
            color:red;
        }
        //&,代表他的上一层选择器
        a{
            &:hover {
                color:yellow;
            }
        }
    } 
}
//arguments
.border_3(@w:30px,@s:solid,@c:black){
    border: @arguments;
}
.box2 {
    .border_3(50px);
}

//避免编译
.test{
    width: calc(300px-30px);
    width: ~'calc(300px-30px)';
}

//!important
.test111 {
    .border-radius()!important;
}
//选择器
.grid-gen(3);
.grid-gen(@n,@i:1) when (@i =<@n) {
   .small-block-grid-@{i} {
       width: (@i *100% /@n);
   }
   .grid-gen(@n,(@i + 1));
}
  
.truth (@a) when (@a = 0) { float:right; }
li
{
.truth(0);
}
@import:red;

.colorI {
    color:@import;
}
```