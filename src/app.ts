import express from "express"; //ts版的express
import { Express } from "./config/varType"
import pageController from "./controller/pageController";
import userController from "./controller/userController";
const captcha = require("svg-captcha");//验证码
let ejs = require("ejs");//ejs模板引擎
let cookie = require("cookie-parser");
let session = require("express-session");
let bodyParser = require("body-parser");//post数据解析模块
let urlencodeParse = bodyParser.json({limit:"50mb"});//设置把post数据解析到body对象里
var app:Express = express();
app.use(cookie('blogcookieandsessionzcwyby'));//设置cookie和session的秘钥
app.use(session({//前端访问后端，都会生成一个sessiId存到前端浏览器cookie里面
    secret:"blogcookieandsessionzcwyby",
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:10*60*1000}
}))
app.use(urlencodeParse);
//设置模板视图文件（html文件，视图层）目录
app.set("views",__dirname+"/view")//1.设置目录，视图模板文件在当前目录的view文件夹里
app.engine("html",ejs.__express);//2.设置模板引擎，为html模板引擎，可以支持ejs模板语法
// 配置静态文件
app.use("/static",express.static(__dirname+"/static"));
pageController(app);//nodejs的路由就是控制器层
userController(app);
app.listen(8081,function(){
    console.log("server start");
})