# axios 拓展

#### 1、简介

- `Axios`是基于`promise`的`HTTP`库，可以用于浏览器和 node.js 的服务器端通信。

- 官网： [axios](https://github.com/axios/axios)

#### 2、使用方式：

- `script` 导入： `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>` 
- `npm` 安装： `npm install vue-axios` **vue-axios是axios的插件可以用use的方法导入**
- `import Axios from 'axios'`; `import VueAxios from 'vue-axios'`;
- `Vue.use(VueAxios,Axios)`;
> 如果 `npm i axios` 直接安装axios 不能用use方法导入要用`Vue.prototype.$http = axios` 形式

#### 3、注意点：

- **`axios` 不支持跨域请求数据**

#### 4、Vue 中使用方法

- ** 与vue-resource 类似*

```javascript
    this.$http.get('http://localhost:16688/slides111')
        .then((res) => {
            this.list = res.data;
        })
```

#### 5、使用方法：

- 第一种使用方法：

```javascript
    axios({
         methods : 'get',
         url : 'http://localhost:16688/slides'
    }).then((res) => {
        this.list = res.data;
    })
```


- 第二种使用方法：

```javascript
    axios.get('http://localhost:16688/slides').then((res) => {
        this.list = res.data;
    })
```

- 第三使用方法(提取公用js)：

提取公用js文件

```javascript
    import axios from 'axios';
    export var HTTP = axios.create({
      baseURL: 'http://localhost:16688/'  // 提取域名
    });
```

调用公用js文件
```javascript
    import {HTTP} from '../kits/common.js'

    HTTP.get('slides').then((res) => {
        this.list = res.data;
    })
```

#### 6.配置请求头

```js
//http.js
import axios from 'axios'

export const httpInstance = axios.create({
    baseURL: 'http://api.feigo.test/',
    timeout: 1000,//请求超过1s就会被中断
    headers: {
        'Accept':'application/json',
        'token':'ee95o+QIh/uZJulfNx8wozAYj+fqv+q7/MT16bHRd1zX2lxMKczjZD5dDAkTY09TU/3gsXc5eYo'
    },
})
//main.js
import axios from 'axios'
Vue.prototype.$http = axios
//引入token
import {httpInstance} from './config/http'
Vue.prototype.http = httpInstance;
```