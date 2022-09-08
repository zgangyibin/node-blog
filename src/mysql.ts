import config from "./config/config";
let mysql = require("mysql");

const mysqlPool = mysql.createPool({//创建数据库连接池，该方法内部会创建一批数据库连接对象工使用
    ...config.mysqlConfig
})

export default mysqlPool;