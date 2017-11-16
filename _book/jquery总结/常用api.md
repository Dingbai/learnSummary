# jquery总结

**特点**
- 写得少,做得多,链式编程,隐式迭代

**顶级对象**
- $
- jQuery

## 入口函数

1. $(function(){ 代码块 });
2. $(window).load(function({ 代码块 }));
3. $(document).ready(function(){ 代码块 });

### jq中入口函数和js中入口函数的区别
- jQuery 中的入口函数可以写多个 js中只能写一个
> **Tips** ,1,2在页面基本标签加载完毕后就可以触发,3在整个页面加载完成后才能执行.
###  事件DOMContentLoaded和load的区别
 **他们的区别是，触发的时机不一样，先触发DOMContentLoaded事件，后触发load事件.**
DOM文档加载的步骤为
1. 解析HTML结构。
2. 加载外部脚本和样式表文件。
3. 解析并执行脚本代码。
4.  DOM树构建完成。//DOMContentLoaded
5. 加载图片等外部文件。
6. 页面加载完毕。//load
 在第4步，会触发DOMContentLoaded事件。在第6步，触发load事件。
 
- js中DOMContentLoaded事件代码

```js  
document.addEventListener("DOMContentLoaded", function() {
			   // ...代码...
		}, false);

window.addEventListener("load", function() {
		    // ...代码...
	 }, false);
```

- jq中load事件代码

```js
		    // DOMContentLoaded
			$(document).ready(function() {
		    // ...代码...
			});

			//load
			$(document).load(function() {
		    // ...代码...
			});
```

## Dom对象和jQuery对象相互转换
### jq ====> Dom
- $(obj).get(0);
- $(obj)[0]
### Dom ===> jq
- $(Dom);
## jq获取元素的方法
### jq支持选择器，一般用css中的选择器来获取元素
- 标签，类，ID，后代，子代，兄弟，+第一个兄弟，~所有兄弟，*$("cls*")cls内的所有标签
### 常用的获取元素的方法
1. children（）子元素
2. find() 针对当前元素找元素内其他元素
3. siblings（）所有兄弟元素
4. first（）第一个兄弟元素
5. last（）最后一个兄弟元素
6. next（）下一个兄弟元素
7. nextAll（）当前元素的后面的所有兄弟元素
8. prev（） 获得当前元素的前一个兄弟元素
9. prevAll（）获得当前元素前面的所有兄弟元素
### 索引相关选择器
1. :eq()选择带有指定索引号的元素，值不能为空
2. ：odd 奇数选择
3. ：even偶数选择
4. ：lt（）less than 选择索引号小于当前值的兄弟元素
5. ：gt（） 选择索引号大于当前值的兄弟元素
6. index（）获取当前元素的索引值
7. ：selected 选择被选中的元素
## 元素内部属性获取和设置方法
2. txt（）获取标签中的内容，txt（“内容”）设置内容
3. attr（）多用于获取自定义属性能获取一些固有属性
4. prop（）获取并设置元素的固有属性 ID，class，type，selected，checked，name，style，，，，，，
5. css（）设置css样式，能设置的样式都能获取
6. width（）/height() 可以设置和获得宽高，值为数值型，
7. offset（）获取元素位置，是方法也是对象，含有left，top两个值，通过offset（）.left/top获取左上的值
8. scrollleft/scrollTop()方法获取卷走的距离
## jq类的增删方法
1. addClass（）添加类方法，类名不加点多类名用空格隔开，或再点一个addclass（）方法
2. removeClass（）移除类名，如果括号中什么都不填，就移除目标元素的所有类名，如果指定了类名就移除当前指定的类名
3. hasClass（）判断当前元素是否添加了类样式，值为布尔值，
4. toggleClass（）切换类样式，有类样式就移除没有就添加，
## jq创建元素及其相关方法
1. html（“要创建的内容”）创建元素，缺点此方法创建出来的元素会覆盖掉之前的元素。
2. $("要创建的内容“）最常用
### 追加元素的方法
1. append（）   obj.append("li"）将li追加进obj中
2. prepend（）向前追加元素
3. before（）向前追加兄弟元素
4. after（）向后追加兄弟元素
5. apendTo（）要追加的元素追加到目标中
## 动画相关方法
1. animate(),参数1，键值对  2，时间  3，回调函数
2. hide（）隐藏   参数1，时间，可以是数值型，也可以是关键字  slow ，normal，fast      2，回调函数
3. show（）隐藏   参数1，时间，可以是数值型，也可以是关键字  slow ，normal，fast      2，回调函数
4. slide 系列  参数同上
- slideUp ()滑入
- slideDown ()滑出
- slideToggle() 切换
5. fade系列
- fadeIn（）淡入
- fadeOut（）淡出
- fadeToggle（）切换
- fadeTo(1000，.7)透明度变换透明度在一秒内变为0.7
6. stop方法
- 停止正在运行的动画，参数1，stopAll 布尔值是否停止当前队列的动画    2，goToEdd 布尔值是否允许完成当前动画，该参数只有在参数1存在时才能生效
## 事件绑定及解绑方法
### 事件绑定方法	
1. bind（）方法    参数1，事件名   2，匿名函数
2. delegate（）方法，参数1，绑定对象，  2，事件名，3，匿名函数  该方法由父元素调用，为其子元素绑定方法
3. on（）方法  一，参数1，事件名，2，匿名函数  二，参数1，事件名，2，绑定对象的元素， 3，匿名函数   此方法也是由父元素调用为子元素绑定事件
### 解绑方法
1. unbind()
2. undelegate()
3. off()
## trigger()方法
1. 用于模拟用户操作，如进入页面后的点击事件，
2. 触发自定义的事件，
3. 执行浏览器默认事件
## 其他方法
1. resize() 当窗体大小发生改变时触发resize事件
2. innerWidth()  内容+内边距
3. outWidth() 内容+ 内边距+ 边框 
4. outWidth （true）内容+ 内边距+ 边框+外边框
## 事件冒泡及阻止事件冒泡
### 事件冒泡
- 事件冒泡指的是有父子级关系的元素，如果同时被绑定了相同的事件，子元素的事件被触发，父元素的时间也会被触发
### 阻止事件冒泡的方法
1. return false  也能阻止浏览器默认事件
2. stopPropagation() 方法
## each方法
1. $.each(数组/对象，function（i，n）{如果是遍历数组        i，是索引号，n，是对应的值        如果遍历的是对象    i，是属性名    n，是属性值     })
2. $(要遍历的对象).each(function(i,n){i,是属性名，n，是属性值})
## 多库共存
**为了防止jq中顶级对象$和其它框架冲突，发明的兼容性处理办法**
1. 释放控制权   声明一个变量接收$释放的控制权     
2. var top=$.noconflict();将top变为顶级对象，
2. 用JQuery顶级对象获取元素
 