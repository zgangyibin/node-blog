"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("../mysql"));
exports.default = {
    register(email, password, nick) {
        return new Promise((resolve, reject) => {
            mysql_1.default.getConnection(function (err, conn) {
                if (err) {
                    console.log(err);
                    reject({ err });
                    conn.release(); //释放连接对象，还回连接池
                    return;
                }
                const sqlstr = "insert into users(email,password,nick,createTime) values(?,?,?,now())";
                const sqlstrParmas = [email, password, nick];
                conn.query(sqlstr, sqlstrParmas, function (err, result) {
                    resolve({ err, result });
                });
            });
        }).then((data) => data).catch((err) => err);
        //调用数据库连接池的连接对象，conn是一个数据库连接对象
    },
    login(username, password) {
        return new Promise((resolve, reject) => {
            mysql_1.default.getConnection(function (err, conn) {
                if (err) {
                    reject({ err });
                    conn.release(); //释放连接对象，还回连接池
                    return;
                }
                const sqlstr = `select id,nick,username from users where username=? and password=?`;
                const sqlstrParmas = [username, password];
                conn.query(sqlstr, sqlstrParmas, function (err, result) {
                    resolve({ err, result });
                });
            });
        }).then((data) => data).catch((err) => err);
    },
    //获取用户列表
    getList(page) {
        return new Promise((resolve, reject) => {
            mysql_1.default.getConnection(function (err, conn) {
                if (err) {
                    reject({ err });
                    conn.release(); //释放连接对象，还回连接池
                    return;
                }
                const sqlstr = `select id,username,nick,createTime from users limit ?,20`;
                const sqlstrParmas = [(page - 1) * 20];
                conn.query(sqlstr, sqlstrParmas, function (err, result) {
                    resolve({ err, result });
                });
            });
        }).then((data) => data).catch((err) => err);
    },
};
