const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
// const EventEmitter = require('events');//事件发生器
const port = 3000;
const content = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'zhangyao123456',
    database: 'mocksvuenode',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 登录验证
app.post('/admin', (req, res) => {
    const data = req.body;
    const login = data.login;
    const password = data.password;
    var sql = `SELECT name ,password FROM lusename WHERE NAME = '${login}' AND password = '${password}'`;
    content.query(sql, (err, rustle) => {
        if (err) {
            console.log('sql+err' + err);
        }
        if (rustle) {
            res.set('Custom-Status', 'success');
            if (rustle.length > 0) {
                res.status(200).json({ message: 'Login successful' });
                // console.log('sql+rustle' + rustle);
            } else {
                res.set('Custom-Status', 'error');
                res.status(401).json({ message: 'Login failed' });
            }
        }
    })
});
// 注册验证
app.post('/login', (req, res) => {
    const data = req.body;
    const login = data.login;
    const password = data.password;
    const radio = data.radio;
    const age = data.age;
    const formattedDated = data.formattedDate;
    const className = data.class;
    const Iph = data.Iph;
    const Emit = data.Emit;
    let YTph;
    let YEmit;
    // console.log(req.body);
    //正则匹配
    const phoneNumberRegex = /^1[3-9]\d{9}$/;
    if (phoneNumberRegex.test(Iph)) {
        // 手机号格式正确
        YTph = Iph;
    } else {
        // 手机号格式不正确
        alert('请输入正确的手机号');
    }
    const EmitRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/;
    if (EmitRegex.test(Emit)) {
        // 邮箱格式正确
        YEmit = Emit;
    } else {
        // 邮箱格式不正确
        alert('请输入正确的邮箱');
    }
    // console.log(login, password, radio, className, Iph, Emit);
    var sql = `insert into  lusename (NAME, password,radio,age,formattedDated,className,Iph,Emit) values (?,?,?,?,?,?,?,?)`;
    content.query(sql, [login, password, radio, age, formattedDated, className, YTph, YEmit], (err, rustle) => {
        if (err) {
            console.log("sql" + err);
        }
        if (rustle) {
            if (rustle.length > 0) {
                console.log(rustle);
                res.status(200).json({ message: 'admin success' });
            }
        }
    })
});
//获取数据库中的数据
app.get('/data', (req, res) => {
    req.data;
    var sql = `select * from lusename`;
    content.query(sql, (err, data) => {
        if (err) {
            console.log("sql err" + err);
            return;
        }
        res.send(JSON.stringify(data));
    })
});
// if (login === loginDemo && password === loginPassword) {
// 登录成功
// console.log("success")
// res.set('Custom-Status', 'success');
// res.status(200).json({ message: 'Login successful' });
// } else {
// 登录失败
// res.set('Custom-Status', 'error');
// res.status(401).json({ message: 'Login failed' });
// console.log("error")
// }
// var loginDemo = "admin";
// var loginPassword = "admin123";
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('listening on port - success: ' + port);
});