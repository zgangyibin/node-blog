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
const blogModel_1 = __importDefault(require("../model/blogModel"));
let fs = require("fs");
function default_1(app, rootPath) {
    //添加博客
    app.post("/api/addBlog", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield blogModel_1.default.addBlog(Object.assign(Object.assign({}, req.body), { uid: req.uid }));
            const { err, result } = data;
            if (err) {
                res.json({ success: false, message: err.message });
            }
            else {
                res.json({ success: true, message: "成功" });
            }
        });
    });
    //获取博客列表
    app.post("/api/getBlogList", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page } = req.body;
            const uid = req.uid; //uid从token中解析出来的
            let data = yield blogModel_1.default.getList(uid, Number(page));
            let { err, result } = data;
            console.log(uid, "用户uid");
            if (err) {
                res.json({ success: false, message: err.message });
                return;
            }
            data = yield blogModel_1.default.getListCount(uid); //获取用户博客总数
            if (data.err) {
                res.json({ success: false, message: data.err.message });
                return;
            }
            res.json({ success: true, data: result, total: data.result[0].total });
        });
    }),
        //返回博客详情
        app.get("/api/getDetail", function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id } = req.query; // 获取？后传递的参数用query
                const uid = req.uid; //uid从token中解析出来的
                let data = yield blogModel_1.default.getBlogDetail(id);
                let { err, result } = data;
                if (err) {
                    res.json({ success: false, message: err.message });
                    return;
                }
                res.json({ success: true, data: result[0] });
            });
        }),
        //删除
        app.post("/api/delBlog", function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id } = req.body;
                let data = yield blogModel_1.default.delBlog(id);
                const { err, result } = data;
                if (err) {
                    res.json({ success: false, message: err.message });
                }
                else {
                    res.json({ success: true, data: result });
                }
            });
        });
    //修改博客
    app.post("/api/updateBlog", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield blogModel_1.default.updateBlog(req.body);
            const { err, result } = data;
            if (err) {
                res.json({ success: false, message: err.message });
            }
            else {
                res.json({ success: true, message: "注册成功" });
            }
        });
    });
    //文件上传
    app.post("/api/adddetailimg", function (req, res) {
        let name = req.files[0].originalname; //获取上传图片名称
        let path = rootPath + "/static/blogimg/" + name;
        fs.readFile(req.files[0].path, function (err, data) {
            fs.writeFile(path, data, function (err, data) {
                if (err) {
                    res.json({ success: false, errno: 1, message: err.message });
                    return;
                }
                res.json({ success: true, erron: 0, "data": {
                        "url": name,
                        "alt": "",
                        "href": "", //图片链接，非必须
                    } });
            });
        });
    });
    //文件删除
    app.post("/api/deldetailimg", function (req, res) {
        const { file } = req.body;
        file.forEach(function (item) {
            let file = rootPath + "/static/blogimg/" + item;
            fs.unlink(file, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
        res.json({ success: true, message: "删除成功" });
    });
}
exports.default = default_1;
