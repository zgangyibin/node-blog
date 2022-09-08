"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    app.get("/", function (req, res) {
        res.render("index.html", {
            title: "首页",
            banner: [{ img: "/static/images/b1.jpg" }, { img: "/static/images/b2.jpg" }, { img: "/static/images/b3.jpg" }]
        });
    });
    app.get("/test", function (req, res) {
        res.send("hello test1");
    });
}
exports.default = default_1;
