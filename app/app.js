"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //ts版的express
const pageController_1 = __importDefault(require("./controller/pageController"));
const userController_1 = __importDefault(require("./controller/userController"));
const captcha = require("svg-captcha");
let ejs = require("ejs");
let cookie = require("cookie-parser");
let session = require("express-session");
let bodyParser = require("body-parser"); //post数据解析模块
let urlencodeParse = bodyParser.json({ limit: "50mb" }); //设置把post数据解析到body对象里
var app = (0, express_1.default)();
app.use(cookie('blogcookieandsession')); //设置cookie和session的秘钥
app.use(session({
    secret: "blogcookieandsession",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000 }
}));
app.use(urlencodeParse);
//设置模板视图文件（html文件，视图层）目录
app.set("views", __dirname + "/view"); //1.设置目录，视图模板文件在当前目录的view文件夹里
app.engine("html", ejs.__express); //2.设置模板引擎，为html模板引擎，可以支持ejs模板语法
// 配置静态文件
app.use("/static", express_1.default.static(__dirname + "/static"));
(0, pageController_1.default)(app); //nodejs的路由就是控制器层
(0, userController_1.default)(app);
app.listen(8081, function () {
    console.log("server start");
});
