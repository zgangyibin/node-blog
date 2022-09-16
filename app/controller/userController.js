"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../model/userModel"));
let jwt = require("jsonwebtoken"); //引入生成token模块
function default_1(app) {
    //添加用户
    app.post("/api/addCreateAdminUser", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, nick } = req.body;
            let data = yield userModel_1.default.register(username, password, nick);
            const { err, result } = data;
            if (err) {
                res.json({ success: false, message: err.message });
            }
            else {
                res.json({ success: true, message: "注册成功" });
            }
        });
    });
    app.post("/api/adminLogin", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, yzm } = req.body;
            const sessionYzm = req.session.yzm;
            console.log(req.session.yzm);
            if (yzm !== sessionYzm) {
                res.json({ success: false, message: "验证码错误" });
                return;
            }
            //避免回调地狱
            let data = yield userModel_1.default.login(username, password);
            const { err, result } = data;
            if (err) {
                res.json({ success: false, message: err.message });
            }
            else {
                if (result.length > 0) {
                    console.log(result);
                    let token = jwt.sign({ id: result[0].id }, "zzz222myblog121wcy", {
                        expiresIn: 24 * 60 * 60 //配置token有效期为24小时
                    });
                    res.json({ success: true, token, data: result[0] });
                }
                else {
                    res.json({ success: false, message: "用户名或密码错误" });
                }
            }
        });
    });
    //获取用户列表
    app.get("/api/getAdminUserList", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page } = req.query;
            let data = yield userModel_1.default.getList(Number(page));
            const { err, result } = data;
            if (result.err) {
                res.json({ success: false, message: err.message });
            }
            else {
                if (err) {
                    res.json({ success: false, message: err.message });
                }
                else {
                    res.json({ success: true, data: result, page });
                }
            }
        });
    });
    //删除
    app.get("/api/delAdminUser", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            let data = yield userModel_1.default.delAdminUser(id);
            const { err, result } = data;
            if (err) {
                res.json({ success: false, message: err.message });
            }
            else {
                res.json({ success: true, data: result });
            }
        });
    });
    //修改用户
    app.post("/api/updateAdminUser", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, nick, id } = req.body;
            let data = yield userModel_1.default.updateAdminUser(password, nick, id);
            const { err, result } = data;
            if (err) {
                res.json({ success: false, message: err.message });
            }
            else {
                res.json({ success: true, message: "注册成功" });
            }
        });
    });
}
exports.default = default_1;
