"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("../mysql"));
exports.default = {
    //添加博客
    addBlog(data) {
        return new Promise((resolve, reject) => {
            mysql_1.default.getConnection(function (err, conn) {
                if (err) {
                    console.log(err);
                    reject({ err });
                    conn.release(); //释放连接对象，还回连接池
                    return;
                }
                const { title, keywords, description, content, cover, showBlog, uid, blogType } = data;
                const sqlstr = "insert into blog(title,keywords,description,content,cover,showBlog,uid,blogType,createTime) values(?,?,?,?,?,?,?,?,now())";
                const sqlstrParmas = [title, keywords, description, content, cover, showBlog, uid, blogType];
                conn.query(sqlstr, sqlstrParmas, function (err, result) {
                    resolve({ err, result });
                });
            });
        }).then((data) => data).catch((err) => err);
        //调用数据库连接池的连接对象，conn是一个数据库连接对象
    },
    // 获取博客列表
    getList(uid, page) {
        return new Promise((resolve, reject) => {
            mysql_1.default.getConnection(function (err, conn) {
                if (err) {
                    reject({ err });
                    conn.release();
                    return;
                }
                // 如果直接把前端的字符串拼接到sql语句，容易被sql注入攻击。
                // 需要把前端输入的内容作为字符串，用？占位符。
                // limit start, count; 限制数据显示条数。start开始显示数据的条，count总共显示多少条。
                const sqlstr = `select blog.*,users.nick from users,blog where blog.uid=users.id and blog.uid=? order by id desc limit ?,20`;
                const sqlstrParam = [uid, (page - 1) * 20];
                conn.query(sqlstr, sqlstrParam, function (err, result) {
                    conn.release();
                    resolve({ err, result });
                });
            });
        }).then((data) => data).catch((err) => err);
    },
    // 获取博客总数
    getListCount(uid) {
        return new Promise((resolve, reject) => {
            mysql_1.default.getConnection(function (err, conn) {
                if (err) {
                    reject({ err });
                    conn.release();
                    return;
                }
                // 如果直接把前端的字符串拼接到sql语句，容易被sql注入攻击。
                // 需要把前端输入的内容作为字符串，用？占位符。
                // limit start, count; 限制数据显示条数。start开始显示数据的条，count总共显示多少条。
                const sqlstr = `select count(id) as total from blog where uid=?`;
                const sqlstrParam = [uid];
                conn.query(sqlstr, sqlstrParam, function (err, result) {
                    conn.release();
                    resolve({ err, result });
                });
            });
        }).then((data) => data).catch((err) => err);
    },
    //删除博客
    delBlog(id) {
        return new Promise((resolve, reject) => {
            mysql_1.default.getConnection(function (err, conn) {
                if (err) {
                    reject({ err });
                    conn.release(); //释放连接对象，还回连接池
                    return;
                }
                const sqlstr = `delete from blog where id=?`;
                const sqlstrParmas = [id];
                conn.query(sqlstr, sqlstrParmas, function (err, result) {
                    resolve({ err, result });
                });
            });
        }).then((data) => data).catch((err) => err);
    },
    // 修改用户
    updateBlog(data) {
        return new Promise((resolve, reject) => {
            mysql_1.default.getConnection(function (err, conn) {
                if (err) {
                    console.log(err);
                    reject({ err });
                    conn.release(); //释放连接对象，还回连接池
                    return;
                }
                const { title, keywords, description, content, cover, showBlog, blogType, id } = data;
                const sqlstr = "update blog set title=?,keywords=?,description=?,content=?,cover=?,showBlog=?,blogType=? where id=?";
                const sqlstrParmas = [title, keywords, description, content, cover, showBlog, blogType, id];
                conn.query(sqlstr, sqlstrParmas, function (err, result) {
                    resolve({ err, result });
                });
            });
        }).then((data) => data).catch((err) => err);
        //调用数据库连接池的连接对象，conn是一个数据库连接对象
    },
};
