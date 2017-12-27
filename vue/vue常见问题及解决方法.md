### vue常见问题及解决方法

#### vue中router-link不能绑定事件原因及解决办法
router-link设计单纯为了跳转，所以不能绑定事件，
`@click.native="check"` 加`.native`把router-link改回原生a标签

#### keep-alive组件
是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM 用该组件包裹根组件router-view以减少渲染次数

#### vue 登录页面制作
判断密码设置cookie，用`$router.push('/')`方法定向路由
> 路由不必须放在router-link中

#### vue之间的兄弟传值 event bus

> 这种方式不会将数据作为停留 不方便进行存取操作, 只能作为值的搬运工

- 首先定义一个全局的vue对象 例如取名为transfer.js,**作为组件间值的中转站** 如下：

```javascript
import vue from vue

export default  new vue

```

- 然后再发送组件中
```javascript
//1.0 导入中转对象
 import  transfer from '../transfer.js'
//2.0 在此假设有个事件 作为发送数据的事件 
 sendMsg(){
   transfer.$emit("要传的值的key","要传的value")
 }
```

- 最后在接受组件中

```javascript

// 1.0 导入中转站对象
 import  transfer from '../transfer.js'

// 接受数据
 mounted(){   //
  transfer.$on("传来的值的key",function(res){
       //res就是传过来的值
    })
 }
 
```

#### vue history模式


#### 登录代码

```js
router.beforeEach((to,from,next) => {
    if(to.meta.requiresAuth){
        if(sessionStorage.getItem('local_key') == null){
            alert('请先登录...')
            next({path : '/login'})
        }else{
            next();
        }
    }else{
        next();
    }
})
```

#### 在手机端调用调试工具

```js
//在app.vue中加入
created(){
  const script = document.createElement('script');
  script.src = '//cdn.jsdelivr.net/npm/eruda';
  document.body.appendChild(script);
  script.onload = function () { window.eruda.init({tool: ['elements', 'console', 'network', 'sources']}) }
},
```