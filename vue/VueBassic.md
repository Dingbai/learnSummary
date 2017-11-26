### vue 基础
**由于gitbook不支持双花括号，故将双花括号替换为$$ $$**

#### $$  $$里面支持表达式,不支持语句;
```js
    $$  number + 1  $$
    $$  ok?'true':'false'  $$
    $$  message.split('').join('')  $$
```

#### 解决表达式闪烁方法
- v-text
        **将 数据 解释为纯文本渲染到指定的元素中;**
- v-html
        **v-html将被插入的内容当作HTML解析,但没有html标签时,和$$  $$,v-text一样;**

> 注:使用v-html容易导致xss(跨站脚本)的攻击,故尽量不要使用v-html

- v-cloak
**原理**
- 由于display为none,故先将span隐藏起来
- 等vue实例化结束后,移除v-cloak
- css样式失效,故显示出 msg 内容;

```js
        <style>
            [v-cloak] { display: none }
        </style>

        <span v-cloak>$$ msg $$</span>

        new Vue({
            data:{
                msg:'hello ivan'
            }
        })
```

>   注:this.name正确,而this.data.name错误的原因:vue内部已经将name直接处理成this(对象)的属性;

#### v-model 双向数据绑定
-  仅在input,select,textarea及components(vue组件)中使用

```js
       <input type="text" v-model="name" />
        new Vue({
            data:{
                name:''
              // 注:name这个属性值和input元素的值相互影响;
            }
        })
```

#### 修饰符(为了让methods更专注于纯粹的逻辑，少关注dom事件细节)
- v-model事件修饰符
    + `.lazy`  vue中将默认的`input`事件改为`change`事件（在change事件中而不是在input事件中触发）
    + `.number` 自动转化为数字（当输入内容为字符串时类型将不会发生变化）;
    + `.trim` 自动去掉首尾的空格;

- v-on事件修饰符 
    + `.stop` 阻止事件冒泡（等同于` event.stopPropagation() ` 方法）
    + `.prevent` 阻止浏览器默认行为（等同于`event.preventDefault()`）
    + `.self` 只有当事件绑定元素本身触发时才会触发（等同于`event.target()`方法）
    + `.once` 绑定的事件只会触发一次
    + `.native` 监听组件根元素的原生事件。

> 修饰符可以串联写 `<a v-on:click.stop.prevent="doThat"></a>`

- 按键修饰符
    + `.keycode` 监听键盘按键 `<input v-on:keyup.13="submit">`

> 修饰符可以使用别名 规定的别名有 `.enter .tab .delete（捕获删除和空格） .esc .space .up .down .left .right`
> 可以通过`config.keyCodes`来自定义按键修饰符别名 `vue.config.keyCodes.hh = 112`

**1.0.8+ 支持单字母按键别名。**

```js
    <input type="text" v-model="name" @keydown.f2='add'>
    Vue.directive('on').keyCodes.f2 = 113;
```

> 在1.0中按键修饰符存储在Vue.directive('on').keyCodes 中
> 在2.0中按键修饰符存储在Vue.config.keyCodes 中

- 系统修饰符（相当于添加组合键）
    + `.ctrl`
    + `.alt`
    + `.shift`
    + `.meta` 在windows中相当于window键（徽标键）

```html
<!-- alt+c -->
<input @keyup.alt.67='hello'>
<!-- alt+click -->
<input @click.alt = 'hello'>
```

- `.exact` 搭配其他系统修饰符一起使用，用于精确定位某一修饰符（用于解决点击系统修饰符时如果点到了其他修饰符，系统修饰符也会产生作用的问题）

```html
<!-- 点击到Ctrl或shift时alt修饰符也会生效 -->
<input @keyup.alt.67='hello'>
<!-- 只有点击到alt+c时修饰符才会起作用 -->
<input @keyup.alt.67.exact='hello'>
```

- 鼠标修饰符(这些修饰符会限制回调函数响应鼠标按钮)
    + `.left` 
    + `.right` 
    + `.middle` 
- `.sync` 修饰符在2.x中用做于编译的语法糖，被扩展为一个自动更新父组件属性`v-on`的监听器

```html
<!-- 原代码 -->
<comp :foo.sync='bar'></comp>
<!-- 扩展之后的代码 -->
<comp :foo='bar' @update:foo='val=>bar = val'></comp>
<!-- 需要显示触发一个更新事件 -->
this.$emit('update:foo',newValue)
```

#### directive自定义指令

```js
    <input type="text" v-focus placeholder="筛选内容" v-model='sname'>
    Vue.directive('focus', function () {
        var p = this.el;
        // 此处的this指代的是Vue.directive(...)整体;而this.el指的是调用v-focus的元素,此处为<input type="text" placeholder="筛选内容">;
        p.focus();
    })
    // focus在vue中,某些浏览器不能使用;
```

#### directive自定义指令

```js
    <input type="text" v-color='txtcolor' placeholder="筛选内容" v-model='sname'>
    Vue.directive('color', function () {
        this.el.style.color = this.vm[this.expression]
//        this    =>当前自定义指令
//        this.vm     =>当前指令所在的区间
//        this.expression =>当前自定义指令的属性值
    })
    var vm = new Vue({...});
```

#### v-bind 可以动态的给html元素或vue组件绑定特性

```html
    <a v-bind:"{href:'http://www.itcast.cn'+id}"> </a>
    <div v-bind:class='[classA,classB]'></div>
    <!-- 简写:<div :class='[classA,classB]'></div> -->
```

#### v-for vue中的遍历

```js
    <div v-for="item in items">
        {{ item.text }}
    </div>
    new Vue({
        data:{
            items:[{text:'1'},{text:'2'}]
        }
    });
```

>   注:vue1.0和vue2.0中v-for的区别:
>       1> vue1.0含有$index,而2.0没有
>           =>1.0 <li v-for='item in arr'>$$ $index $$---$$ item $$</li> (获取索引,不加index,直接用vue内置的$index也行)
>       2> 遍历时index在前,值在后;
>           =>1.0 <li v-for='(index,item) in arr'>$$ index $$---$$ item $$</li>
>           =>2.0 <li v-for='(item,index) in arr'>$$ index $$===$$ item $$</li>
>       3> 1.0中解决重复不显示问题,用track-by,而2.0中用 :key(虽然大部分情况下底层已经处理好了重复项的问题,但建议加上)
>           =>1.0 <li v-for='(index,item) in arr' track-by='$index'>$$ index $$---$$ item $$</li>
>           =>2.0 <li v-for='(item,index) in arr' :key='index'>$$ index $$==$$ item $$</li>

####  v-if 元素 移除/添加

```js
    //一般：
        <h1 v-if="isShow">Yes</h1>
    //也可以加 v-else
        <h1 v-if="isShow">Yes</h1>
        <h1 v-else>No</h1>
    //   注：v-else 元素必须紧跟在 v-if 元素否则它不能被识别。
         new Vue({
            data:{
                isShow:true
            }
        });
```

#### v-show 元素显示/隐藏

```js
    <h1 v-show="isShow">Yes</h1>
    new Vue({
        data:{
            isShow:true
        }
    });
//    注:v-if是在DOM中添加或移除,而v-show是在DOM中显示或隐藏(相当于display:none与否)
```

#### v-on 绑定事件监听
- v-on:click
- v-on:mouseover
- v-on:keydown
    `<a href="javascript:;" @click='delData(item.id)'>删除</a>`

>   注:调用函数没有形参时,可省略调用后面的括号


#### confirm(感觉类似与alert的用法)
```js
    if(!confirm('是否要删除数据?')){
		//当用户点击的取消按钮的时候，应该阻断这个方法中的后面代码的继续执行
		return;
	}
```
#### findIndex()
```js
    var index = this.list.findIndex(function(item){return item.id == id});
    //findIndex()括号里面的回调函数返回值为true时,则this.list.findIndex返回此时item的索引
```
#### filterBy (系统过滤器1.0版本含有,2.0版本已删除);

```js
    <tr v-for="item in list | filterBy sname in 'name'"></tr>
```

#### 自定义全局过滤器

```html
    <td> $$  item.ctime | datefmt 'yyyy-mm-dd'  $$</td>
     <!-- 也可写成: -->
    <td>$$ item.ctime | datefmt('yyyy-mm-dd')  $$</td>
    Vue.filter('datefmt',function(input,formatstring){
>   注: <td>中dataftm后面的值作为第二个参数formatstring;
        var res= '';
        var year = input.getFullYear();
        var month = input.getMonth() + 1;
        var day = input.getDate();
        res = year +'-' + month +'-'+ day;
        return res;
    });
>   注:使用moment插件
>       1>导入,定义
>           import mom from 'moment';
>           Vue.filter('dateftm', function (input, ftmstring) {
>   	        return mom(input).format(ftmstring);
>           })
>       2>使用
>           $$ item.time | dateftm('YYYY-MM-DD HH:MM:ss') $$

```
#### 自定义私有过滤器

```js
    <td>$$ item.ctime | datefmt  $$</td>
    filters:{
        'datefmt':function(input){
            var res= '';
            var year = input.getFullYear();
            var month = input.getMonth() + 1;
            var day = input.getDate();
            res = year +'-' + month +'-'+ day;
            return res;
     $$
```

#### v-resource中get (vue通过vue-resource来实现与后台进行交互的);

```js
    <script src="./vue1026.js"></script>
    <script src="./vue-resource121.js"></script>
    <input type="button" value="get" @click='get'> <br> $$ msg | json $$
    methods: {
        get: function () {
            var url = 'http://127.0.0.1:8899/api/getprodlist';
            this.$http.get(url).then(function (response) {
                this.msg = response.body;
            })
        }
    }
```

#### v-resource中post

```js
    <script src="./vue1026.js"></script>
    <script src="./vue-resource121.js"></script>
    <input type="text" v-model='msg'>
    <input type="button" @click='post' value="post">
    data: {
        msg: ''
    },
    methods: {
        post: function () {
            var url = 'http://127.0.0.1:8899/api/addproduct';
            this.$http.post(url, { name: this.msg }, { emulateJSON: true }).then(function (response) {
                alert(response.body.message);
            })
        }
    }
```

#### v-resource中jsonp

```js
    <script src="./vue1026.js"></script>
    <script src="./vue-resource121.js"></script>
    <input type="button" @click='jsonp' value="jsonp"> $$ msg $$
        data: {
            msg: ''
        },
        methods: {
            jsonp: function () {
                var url = 'http://127.0.0.1:8899/api/jsonp';
                this.$http.jsonp(url).then(function (res) {
                    this.msg = res.body;
                })
            }
        }
```

#### 生命周期(1.0)

```js
    new Vue({
        el:'####app',
        data:{
            msg:'hello vuejs'
        },
        init:function(){
            console.log('1.0 init',this.msg);
        }
        ,
        created:function(){
            console.log('2.0 created',this.msg);
        }
        ,
        beforeCompile:function(){
            console.log('3.0 beforeCompile',this.msg);
        }
        ,
        compiled:function(){
            console.log('4.0 compiled',this.msg);
        }
        ,
        attached:function(){
            console.log('5.0 attached',this.msg);
        }
        ,
        ready:function(){
            console.log('6.0 ready',this.msg);
        }
    });
```

#### 生命周期(2.0)

```js
    new Vue({
        el:'####app',
        data:{
            msg:'hello vuejs'
        },
        beforeCreate:function(){
            console.log('1.0 beforeCreate',this.msg);
        }
        ,
        created:function(){
            console.log('2.0 created',this.msg);
        }
        ,
        beforeMount:function(){
            console.log('3.0 beforeMount',this.msg);
        }
        ,
        mounted:function(){
            console.log('4.0 mounted',this.msg);
        }
    });
```

#### vue2.0里面的css动画

```js
    <style>
        .show-enter,
        .show-leave-to {
            padding-left: 100px;
        }

        .show-enter-active,
        .show-leave-active {
            transition: all 1s;
        }

        .show-enter-to,
        .show-leave {
            padding-left: 10px;
        }
    </style>

    <transition name="show">
        <span v-if='isshow'>$$ msg $$</span>
    </transition>

    new Vue({
        el: '####app',
        data: {
            msg: 'hello',
            isshow: false
        },
        methods: {
            go: function () {
                this.isshow = !this.isshow;
            }
        }
    })
```

>   注:transition一般结合v-if,v-show来使用

#### vue2.0结合animate.css实现动画
```js
    <link rel="stylesheet" href="./animate.css">
    // 注:要引入animate.css    
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
        <div style="width:100px" v-if='isshow'>$$ msg $$</div>
    //  注:结合animate必须是块级元素才有效,且不加宽度窗口下面会出现滚动条
    </transition>

    new Vue({
        el: '####app',
        data: {
            msg: 'hello',
            isshow: false
        },
        methods: {
            go: function () {
                this.isshow = !this.isshow;
            }
        }
    })
```

#### vue2.0使用钩子函数实现动画

```js
    <style>
        .show {
            transition: all 1s;
        }
    </style>
    <input type="button" value="btn" @click='go'>
    <transition @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter'>
    //  注:  @before-enter= 的格式一定要写对 
        <div class="show" v-if='isshow'>hello</div>
    </transition>
    methods: {
        go: function () {
            this.isshow = !this.isshow;
        },
        beforeEnter: function (el) {
            el.style.transform = 'translate(100px,0)'
        },
        enter: function (el, done) {
            el.offsetWidth;
            el.style.transform = 'translate(10px,0)'
            done();
        //    注:done()为vue中内置的方法;
        },
        afterEnter: function (el) {
                this.isshow = !this.isshow;
        }
    }
```

#### vue中组件

```js
    <div id="app">
        <login></login>
        <register></register>
        <ai></ai>
    </div>
    
    <template id="ba">
        <h1>你好</h1>
    </template>

// >   注: 第一种写法
    var login = Vue.extend({
        template: '<h1>hello</h1>'
    })
    Vue.component('login', login);
//   注:第二种写法
    Vue.component('register', {
        template: '<h1>hi</h1>'
    })
//   注: 第三种写法
    Vue.component('ai', {
//   注:名称不能写成js中关键字
        template: '####ba'
    })
```
#### vue中组件的数据,方法及子组件

```js
    <body>
        <div id="app">
            <login></login>
        </div>
        <template id="login">
            <div>
        //   注:最好加上div包裹
                <h1 @click='add'>$$ msg $$</h1>
                <register></register>
            </div>
        </template>
        <template id="com_sub">
            <div>
                <h1>hi</h1>
            </div>
        </template>
    </body>
    <script>
        Vue.component('login', {
            template: '####login',
            data: function () {
//            注:此处跟全局的data不一样,子组件的data是函数返回对象的格式
                return {
                    msg: '哈哈'
                }
            },
            methods: {
                add: function () {
                    alert('你好')
                }
            },
            components: {
                register: {
            //   注:组件的名字若用驼峰命名,则在html中使用时标签中就要加上 - ;
                    template: '####com_sub'
                }
            }
        })
        new Vue({
            el: '####app'
        })
     </script>
```

#### vue中父组件向子组件传值

```js
    <body>
        <div id="app">
            <sub :age='id'></sub>
        </div>
        <template id="sub_temp">
            <div>
                <h1>$$ age $$</h1>
            </div>
        </template>
    </body>
    <script>
        new Vue({
            el: '####app',
            data: {
                id: 100
            },
            components: {
                sub: {
                    template: '####sub_temp',
                    props: ['age']
                }
            }
        })
    </script>
```

#### vue中子组件向父组件传值

```js
    <body>
        <div id="app">
            <sub @send='getdata'></sub>
        </div>
        <template id="sub_temp">
            <div>
                <input type="button" @click='senddata' value="btn">
            </div>
        </template>
    </body>
    <script>
        new Vue({
            el: '####app',
            methods: {
                getdata: function (input) {
                    alert(input);
                }
            },
            components: {
                sub: {
                    template: '####sub_temp',
                    methods: {
                        senddata: function () {
                            this.$emit('send', 'hello')
                        }
                    }
                }
            }
        })
    </script>
```

#### vue中获取DOM元素和模块对象的方法

```js
    <body>
        <div id="app">
            <input type="button" value="DOM" @click='dom'>
            <input type="button" value="COM" @click='com'>
            <div v-el:vuedv id="dv">我是DOM</div>
            <sub v-ref:vuecom></sub>
        </div>
        <template id="sub_temp">
            <div>
                <h1>我是组件</h1>
            </div>
        </template>
    </body>
    <script>
        new Vue({
            el: '####app',
            methods: {
                dom: function () {
                    console.log(this.$els.vuedv);
                },
                com: function () {
                    console.log(this.$refs.vuecom)
                }
            },
            components: {
                sub: {
                    template: '####sub_temp'
                }
            }
        })
    </script>
```

#### vue中路由嵌套

```js
    <body>
        <div id="app">
            <router-link to="/account/login">注册</router-link>
            <router-link to="/account/register">登录</router-link>
            <router-view></router-view>
        </div>
    </body>
    <script>
        var app = Vue.extend({
            template: '<div>这是父组件<router-view></router-view></div>'
        })
        var login = Vue.extend({
            template: '<div>注册组件</div>'
        })
        var register = Vue.extend({
            template: '<div>登录组件</div>'
        })
        var router = new VueRouter({
            linkActiveClass : 'active',//锁定当前类
            routes: [{
                path: '/account',
                component: app,
                children: [
                    { path: 'register', component: register },
                    { path: 'login', component: login }
                ]
            }]
        })
        new Vue({
            el: '####app',
            router: router
        })
    </script>
```
>   注:嵌套小结:
>       1>父组件里定义公共模板
>       2>路由对象routes属性写父组件信息
>       3>父组件children写子组件路径及模板;
>   注:要注意的点
>       1> router-link里写/account/login的形式
>       2> 父组件模板中要插入子组件的router-view
>       3> 路由对象的routes属性只有一个参数,即父组件的信息(组件名,路径/account,children)
>       4> 在父组件的children属性中,子组件的path值写成'login',不要加/

#### vue中路由传值

```js
    <body>
        <dvi id="app">
            <router-link to="/login/tom">登录</router-link>
            <router-link to='/register/rose'>注册</router-link>
        //    注: 1)定义路径            
            <router-view></router-view>
        //    注: 2)定义渲染视图            
        </dvi>
    </body>
    <script>
//       注: 1>注册根组件
        var app = Vue.extend({
        })
    //   注: 2>注册其他组件        
        var login = Vue.extend({
            template: '<div><h3>登录组件</h3>$$ this.$route.params.cname $$</div>'
        });
        var register = Vue.extend({
            template: '<div><h3>注册组件</h3>$$ this.$route.params.name $$</div>'
        })
    //   注: 3>配置路由规则(根据/:name将从url接受的数据渲染到组件的模板中)        
        var router = new VueRouter({
            routes: [
                { path: '/login/:cname', component: login },
                { path: '/register/:name', component: register }
            ]
        })
        new Vue({
            el: "####app",
    //   注: 4>将路由绑定到vue对象属性中
            router: router
        })
    </script>
```

>   注: 传值小结:
>       1>用户点击不同连接
>       2>选择不同路径,接受不同url参数
>       3>选择不同模板,将接受url参数渲染
>   注:要注意的点:
>       1>路由对象里面routes属性的组件path中,用/:name接受url参数
>       2>组件模板中用this.$route.params.name渲染url参数

>   注:router,routes及route用的地方
>       1> router   =>用于对象命名
>       2> routes   =>配置路由规则
>       3> route    => this.$route.params.id;
>                      watch监视路由时:'$route'



#### vue中watch

```js
    <body>
        <div id="app">
            <input type="text" v-model='firstName'>
            <input type="text" v-model='lastName'>
            <input type="text" v-model='fullName'>
        </div>
    </body>
    <script>
        new Vue({
            el: '####app',
            data: {
                firstName: 'heima',
                lastName: 'itcast',
                fullName: 'heimaitcast'
            },
            watch: {
                'firstName': function (newval,oldval) {
            //    注: 1>函数中有两个参数,分别代表改变后的firstName值和改变前的firstName值
                //    2>此处监视路由时,键为 '$route' (vue内置的固定写法),函数的两个参数分别为路由的改变前后;
                    this.fullName = this.firstName + this.lastName;
                },
                'lastName': function () {
                    this.fullName = this.firstName + this.lastName;
                }
            }
        })
    </script>
```

#### vue中computed

```js
    <body>
        <div id="app">
            <input type="text" v-model='firstName'>
            <input type="text" v-model='lastName'>
            <input type="text" v-model='fullName'>
        </div>
    </body>
    <script>
        new Vue({
            el: '####app',
            data: {
                firstName: 'itcast',
                lastName: 'heima'
            },
            computed: {
                fullName: function () {
                    return this.firstName + this.lastName;
                }
            }
        })
    </script>
```
    