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
const captcha = require("svg-captcha");
const blogModel_1 = __importDefault(require("../model/blogModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
function default_1(app) {
    app.get("/", function (req, res) {
        res.render("index.html", {
            title: "首页",
            banner: [{ img: "/static/images/b1.jpg" }, { img: "/static/images/b2.jpg" }, { img: "/static/images/b3.jpg" }]
        });
    });
    app.get("/index.html", function (req, res) {
        res.render("index.html", {
            title: "首页",
            banner: [{ img: "/static/images/b1.jpg" }, { img: "/static/images/b2.jpg" }, { img: "/static/images/b3.jpg" }]
        });
    });
    app.get("/list.html", function (req, res) {
        res.render("list.html", {
            title: "列表",
        });
    });
    app.get("/detail.html", function (req, res) {
        res.render("detail.html", {});
    });
    app.get("/layout.html", function (req, res) {
        res.render("layout.html", {});
    });
    app.get("/aarticleJS.html", function (req, res) {
        res.render("aarticleJS.html", {});
    });
    app.get("/about.html", function (req, res) {
        res.render("about.html", {});
    });
    app.get("/algorithm.html", function (req, res) {
        res.render("algorithm.html", {});
    });
    app.get("/article.html", function (req, res) {
        res.render("article.html", {});
    });
    app.get("/article2.html", function (req, res) {
        res.render("article2.html", {});
    });
    app.get("/articleCSS.html", function (req, res) {
        res.render("articleCSS.html", {});
    });
    app.get("/articleHTML.html", function (req, res) {
        res.render("articleHTML.html", {});
    });
    app.get("/articleSEO.html", function (req, res) {
        res.render("articleSEO.html", {});
    });
    app.get("/bottomAdd.html", function (req, res) {
        res.render("bottomAdd.html", {});
    });
    app.get("/develop.html", function (req, res) {
        res.render("develop.html", {});
    });
    app.get("/flex.html", function (req, res) {
        res.render("flex.html", {});
    });
    app.get("/form.html", function (req, res) {
        res.render("form.html", {});
    });
    app.get("/getForm.html", function (req, res) {
        res.render("getForm.html", {});
    });
    app.get("/hr.html", function (req, res) {
        res.render("hr.html", {});
    });
    app.get("/HTML5New.html", function (req, res) {
        res.render("HTML5New.html", {});
    });
    app.get("/htmlAll.html", function (req, res) {
        res.render("htmlAll.html", {});
    });
    app.get("/HTMLForm.html", function (req, res) {
        res.render("HTMLForm.html", {});
    });
    app.get("/HTMLRoad.html", function (req, res) {
        res.render("HTMLRoad.html", {});
    });
    app.get("/jqueryEasy.html", function (req, res) {
        res.render("jqueryEasy.html", {});
    });
    app.get("/JSswiap.html", function (req, res) {
        res.render("JSswiap.html", {});
    });
    app.get("/jsTab.html", function (req, res) {
        res.render("jsTab.html", {});
    });
    app.get("/label.html", function (req, res) {
        res.render("label.html", {});
    });
    app.get("/list.html", function (req, res) {
        res.render("list.html", {});
    });
    app.get("/liuyan.html", function (req, res) {
        res.render("liuyan.html", {});
    });
    app.get("/nav.html", function (req, res) {
        res.render("nav.html", {});
    });
    app.get("/NavMenu.html", function (req, res) {
        res.render("NavMenu.html", {});
    });
    app.get("/networkSite.html", function (req, res) {
        res.render("networkSite.html", {});
    });
    app.get("/PbootCMS.html", function (req, res) {
        res.render("PbootCMS.html", {});
    });
    app.get("/pbootcmsList.html", function (req, res) {
        res.render("pbootcmsList.html", {});
    });
    app.get("/PbootCMSUse.html", function (req, res) {
        res.render("PbootCMSUse.html", {});
    });
    app.get("/SEOBetter.html", function (req, res) {
        res.render("SEOBetter.html", {});
    });
    app.get("/special.html", function (req, res) {
        res.render("special.html", {});
    });
    app.get("/webPath.html", function (req, res) {
        res.render("webPath.html", {});
    });
    app.get("/website.html", function (req, res) {
        res.render("website.html", {});
    });
    //验证码
    app.get("/yzm", function (req, res) {
        const codeConfig = {
            size: 4,
            ignoreChars: "0O1il",
            noise: 3,
            width: 150,
            height: 50,
            fontSize: 45,
            color: true,
            background: "#eee",
        };
        const yzmImg = captcha.create(codeConfig); //创建一个验证码
        req.session.yzm = yzmImg.text; //验证码存到session里面
        res.setHeader("Content-type", "image/svg+xml");
        res.write(String(yzmImg.data));
        res.end();
    });
    // 数据汇总
    app.get("/api/getOrdersEchartData", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.uid;
            let data1 = yield blogModel_1.default.getListCount(uid); //获取博客总数
            const data2 = yield userModel_1.default.getListCount(); //获取用户总数
            const data3 = yield blogModel_1.default.getBlogCharts(uid); //获取博客chart数据
            if (data1.err || data2.err || data3.err) {
                res.json({ success: false, message: "获取chart数据出错" });
            }
            else {
                res.json({ success: true, data: [data1.result, data2.result, data3.result] });
            }
        });
    });
}
exports.default = default_1;
