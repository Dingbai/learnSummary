## canvas

#### 什么是 Canvas

1. 就是 HTML 5 给出的一个可以展示绘图内容的标签.**最早是 苹果公司 提出的该标签.**
2. threejs.org 里面有汽车等 3D 的仿真

####基本使用
1. 提供 Canvas 标签即可. 默认就会占据 300 * 150 的区域
2. 利用 html 属性为它设置宽高. **不要使用 CSS 来设置**.
		使用 属性设置 canvas 标签的宽高, 实际上相当于增加了 canvas 画布的像素
		但是如果使用 CSS 来设置画布的大小, 那么不会增加像素点, 只是将像素扩大了
3. Canvas 只能展示绘图的内容. 但是不能进行绘图
		利用 Canvas 找到绘图工具
		每一个 Canvas 都有一套工具, 利用工具可以在当前 Canvas 上进行绘图
		使用语法 canvas.getContext( '2d' ) 就返回一个在当前画布上绘图的工具集
		这个工具集专门绘制 平面图形. 如果要绘制 立体的图形需要传入 'webgl'
		绘制 平面图形的 对象是 CanvasRenderingContext2D 类型的

####  绘图的坐标系

- canvas 左上角为坐标原点 x向右为正，y向下为正 

####绘图的常用方法

```js
<script>
    var cas = document.getElementById('cas');
    var ctx = cas.getContext('2d');//获取绘图工具
    ctx.moveTo(100,100);//把笔放在100,100位置上
    ctx.lineTo(200,100);//从刚才的位置上抬起来，绘制到哪里
    ctx.stroke();//描边绘图，可以看到效果
</script>
```

####  绘制方法
- ctx.stroke()
- ctx.fill()		
调用 fill 方法会将所有的点连接起来, 并构成一个封闭的图形结构如果所有的描点没有构成封闭结构, 也会将开始的起点, 与最终的点连接起来, 构成一个闭合的图形, 并在里面填充颜色(默认黑色)


####  非零环绕原则
- 如果需要判断某一个区域是否需要填充颜色. 就从该区域中随机的选取一个点. 从这个点拉一条直线出来, 一定要拉到图形的外面. 此时以该点为圆心.看穿过拉出的直线的线段. 如果是顺时针方向就记为 +1, 如果是 逆时针方向,就记为 -1. 最终看求和的结果. 如果是 0 就不填充. 如果是 非零 就填充.

#### 闭合路径

```js
	closePath()
	lineWidth //设置绘制图形的线宽 
	closePath //与 直接使用 lineTo 闭合是有区别的lineTo是直接闭合，closePath是将线圆滑的连在一起
```

####  Canvas 中绘图是有状态的

Canvas 绘图是含有状态的, 在需要改变颜色, 绘制方法, 改变一些属性... 就需要改变绘图状态. 使用 **beginPath()** 方法. 开启一个新的路径.

####虚线

```js
	ctx.setLineDash( 数组 )
	ctx.getLineDash()
	ctx.lineDashOffset = 值
```

数组中存储的数字就是分别表示 实线部分与空白部分的长度 [ 10 ]


#### 如何设置描边与填充的颜色

```js
	ctx.strokeStyle 	//设置描边的颜色
	ctx.fillStyle		//设置填充的颜色
```

####  将直线进行封装

```js
	function Line () {}

	var line = new Line( x0, y0, x1, y1 );
 	line.stroke();
```


####  绘制形状
**矩形**
```js
		ctx.rect( x, y, width, heigth )		//描边, 需要 stroke 或 fill
		ctx.strokeRect( x, y, w, h )
		ctx.fillRect( x, y, w, h )
		ctx.clearRect( x, y, w, h ) 	//如果设置颜色，必须要beginPath（）
```

**清除整个画布**
```js
	ctx.clearRect( 0, 0, cas.width, cas.height );

	cas.width = cas.width;//将画布重新赋值，达到清除画布目的
```

**圆弧**

ctx.arc( x, y, r, startAngle, endAngle, clockwise )
ctx.arcTo() 了解
参数
x,y圆心坐标
startAngle圆弧半径
endAngle,clockwise 圆弧开始的角度，和圆弧闭合的角度角度为弧度制；

#### 弧度制
	
将单位圆的一个整圈( 360 度 )记作 2 倍 的 PI.
这样的度量表示就是弧度制的表示方法.
60 度 PI / 3
45 度 PI / 4
30 度 PI / 6
PI 刚好是一圈
一圈又是 360 度
PI 比上 360 度 = 弧度 比上 对应的角度
angle 角度
radian 弧度

```js
	function toAngle ( radian ) {
		return radian * 180 / Math.PI; 
	}
	function toRadian ( angle ) {
		return angle * Math.PI / 180;
	}
```
#### 角度的坐标

	水平向右的角度是 0 度, 或 0 弧度
	顺时针是正方向, 逆时针是负方向

#### 不等分饼形图

```js
<script>
	// 处理弧度与角度的计算
	function toAngle(radian) {
		return radian * 180 / Math.PI;
	}
	function toRadian(angle) {
		return angle * Math.PI / 180;
	}
	var cas = document.getElementById('cas');
	var ctx = cas.getContext('2d');
	//保存所有的人员数据的数组cs01
	var cs01 = [12, 53, 3];
	//所有的颜色
	var colors = ['red', 'green', 'blue'];
	//求和sum
	var sum = 0;
	//开始角度
	var start = -90;
	//通过forEach求和，
	cs01.forEach(function (v) { sum += v; });
	//通过map映射成一个新数组，数组中的内容包含一个个的对象，对象中包含人数信息和角度信息
	cs01 = cs01.map(function (v, i) { return { v: v, radius: v / sum * 360 }; });
	//通过循环打印饼形
	cs01.forEach(function (v, i) {
		ctx.beginPath();
		ctx.fillStyle = colors[i];
		//console.log(v.radius);
		ctx.moveTo(200, 300);
		ctx.arc(200, 300, 100, toRadian(start), toRadian(start += v.radius));
		ctx.fill();
	});
</script>
```

#### 图片绘制

ctx.drawImage()
- 有三种调用形式
1. ctx.drawImage( img, x, y ) 将 image 绘制到 x, y 表示的位置
2. ctx.drawImage( img, x, y, width, height ) 将 img 绘制到一个矩形区域内
3. ctx.drawImage( img, sx, sy, sw, sh, x, y, w, h )将图片 img 的 sx, sy, sw, sh 部分的内容绘制(类似于剪切)到画布的x, y, w, h 的矩形区域内.

> 创建img标签  new Image()	;与document.createElement('img')作用相同

#### 计时器模型

```js
	var id = setInterval(function () {

		if ( 条件 ) {

			clearInterval( id );
		}
		// 继续执行内容

	}, 20);

```

####变换的概念
- 计算机绘图是利用坐标进行绘图. 绘制任何图形都和坐标系的结构息息相关.所谓的变换就是一套数学公式, 可以记录坐标轴的变化方式.利用坐标轴的变换可以绘制出, 根据不同坐标轴特点而形成的图形.

- 基本的 api
1. ctx.translate()		平移变换
2. ctx.rotate()		旋转变换
3. ctx.scale()			伸缩变换



































