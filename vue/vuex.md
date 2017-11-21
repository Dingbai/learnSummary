 ### vuex vue状态管理工具

 #### 核心方法state

 - 单一状态树用一个对象就包含了全部应用层级状态，状态统一管理工具，

 ```js
 //store.js
 const state = {
    count : 1
}
export default new Vuex.Store ({
    state
})
//count.vue
<p>{{$store.state.count}}--{{count}}</p>
import store from '@/vuex/store'
import mapState from 'vuex' 
export default {
    //mapState辅助函数
    //mapState作用是简化state减少书写内容
    computed:mapState(
        //方法一
        // ['count']
        //方法二
        {
            count:state=>state.count
        }
    ),
    //挂载
    store
}
 ```