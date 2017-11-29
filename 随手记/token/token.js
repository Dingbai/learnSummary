var jwt = require('jsonwebtoken');

var token = jwt.sign({
    username: 'admin',
    password:'123'
}, 'sss', { expiresIn: 60 * 60 });

var decoded = jwt.verify(token, 'sss');
console.log(decoded);
