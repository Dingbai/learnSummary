### promise
**能进行异步请求，或者说能处理异步请求**
#### [promise简介](http://www.jianshu.com/p/063f7e490e9a)
*所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理*
#### promise特点
- promise是一个独立的区域，代表一个异步操作，只有异步操作结果可以决定当前状态，其他手段无法改变（promise的状态值是由它的三个状态值决定的）
- promise有三个状态，pending(初始状态，不是成功或者失败状态),resolve(操作成功),reject(操作失败)
- promise的过程只有两种一种是由pending到resolve另一种是由pending到reject，	状态一旦决定就不会再改变任何时候都可以获得这个结果
- promise有两个参数，resolve，reject
#### promise缺点 
- 一旦建立立即执行，中途无法取消

#### promise api
- Promise.all()所有参数的promise都已经完成（promise中的参数都已经执行完成）
- Promise.race()promise中那个参数先执行完成就输出那个参数

#### 实际需求--同时发送多个请求
**未优化代码（直接发送请求，缺点多个请求嵌套，严重消耗浏览器性能）**
```js
//正常同时发送多个请求
    $(function () {
		var arr = []
		$.get("https://cnodejs.org/api/v1/topics?tab=ask", function (data) {
			arr.push(data);
			$.get("https://cnodejs.org/api/v1/topics?tab=job", function (data) {
				arr.push(data);
					$.get("https://cnodejs.org/api/v1/topics?tab=good", function (data) {
						arr.push(data);
						$.get("https://cnodejs.org/api/v1/topics?tab=share", function (data) {
							arr.push(data);
							console.log(arr)
						})
				})

			})
		})
	})
```
**初步优化代码（在代码中设置计时器监视代码，缺点每次执行都会调用监视函数）**
```js
    (function () {
			var count = 0;
			var arr = [];
			$.get("https://cnodejs.org/api/v1/topics?tab=ask", function (data) {
				arr.push(data);
				handle()
			})
			$.get("https://cnodejs.org/api/v1/topics?tab=job", function (data) {
				arr.push(data);
				handle()
			})
			$.get("https://cnodejs.org/api/v1/topics?tab=good", function (data) {
				arr.push(data);
				handle()
			})
			$.get("https://cnodejs.org/api/v1/topics?tab=share", function (data) {
				arr.push(data);
				handle()
			})

			function handle() {
				count++
				if (count == 4) {
					console.log(arr);
				}
			}
		})()
```
**使用promise优化（完全解决多次调用问题）**
```js
	//promise 简单应用
	//1.建立promise同时处理多个请求呢
    function foo(url) {
			return new Promise(function(resolve, reject) {
				$.get(url, function (data) {
					resolve(data)
				})
			})
		}
		Promise.all([
			foo("https://cnodejs.org/api/v1/topics?tab=ask"),
			foo("https://cnodejs.org/api/v1/topics?tab=job"),
			foo("https://cnodejs.org/api/v1/topics?tab=good"),
			foo("https://cnodejs.org/api/v1/topics?tab=share"),
		]).then(function(result){
			console.log(result);
		})
	//2.按照顺序调用请求
		foo("https://cnodejs.org/api/v1/topics?tab=ask").then(function(data){
			arr.push(data);
			console.log(1);
			console.log(data);
			return foo("https://cnodejs.org/api/v1/topics?tab=job").then(function(data){
				arr.push(data);
				console.log(2);
				console.log(data);
				return foo("https://cnodejs.org/api/v1/topics?tab=good").then(function(data){
					arr.push(data);
					console.log(3);
					console.log(data);
					return foo("https://cnodejs.org/api/v1/topics?tab=share").then(function(data){
						arr.push(data)
						console.log(arr);
					})
				})
			})
		})
	//3.race 调用 那个请求先执行就输出那个
		Promise.race([
			foo("https://cnodejs.org/api/v1/topics?tab=ask"),
			foo("https://cnodejs.org/api/v1/topics?tab=job"),
			foo("https://cnodejs.org/api/v1/topics?tab=good"),
			foo("https://cnodejs.org/api/v1/topics?tab=share")
		]).then(function (result) {
			console.log(result);
		})
```

