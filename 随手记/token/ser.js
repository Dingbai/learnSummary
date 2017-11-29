const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

//middle
app.use(express.static('html'));
app.use(bodyParser.urlencoded({ extended: false }))
//
var token = {};
//
app.post('/loginAction',(req,res)=>{
    //得到数据
    var data = req.body;
    //判断是否匹配
    if(data.uname=='admin'&&data.pwd=='123'){
        //返回用户数据
        var userObj = {
            nickname:'张三',
            age:18,
            sexy:'男',
            intel:'睡觉'
        }
        //返回token
        token = createToken(userObj,'sss',{ expiresIn: 60 * 60 });
        userObj.token = token;
        console.log(userObj);
        res.json(userObj);
    }else{
        res.send('false');
    }

})

//生成token
var createToken=(obj,ser,timeObj)=>{
    var token = jwt.sign(obj, ser, timeObj);
    return token;
}
//listen
app.listen(3000,()=>{
    console.log('服务器启动成功');
})