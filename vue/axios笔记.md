# axios 拓展

#### 1、简介

- `Axios`是基于`promise`的`HTTP`库，可以用于浏览器和 node.js 的服务器端通信。

- 官网： [axios](https://github.com/axios/axios)

#### 2、使用方式：

- `script` 导入： `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>` 
- `npm` 安装：`npm install axios` `npm install vue-axios`
- `import Axios from 'axios'`; `import VueAxios from 'vue-axios'`;
- `Vue.use(VueAxios,Axios)`;

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