import config from "./config/config"; //引入配置文件的mysql配置
let mysql = require("mysql");
const { mysqlConfig } = config;
let connection = mysql.createConnection({
  //创建mysql连接
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
});

function querysql(sqlstr: string): any {
  //封装执行sql语句的函数
  return new Promise(function (resolve, reject) {
    connection.query(sqlstr, function (error: Error, result: any, fileds: any) {
      if (error) {
        reject({ error });
        return;
      }
      console.log("sql ok");
      resolve({ result });
    });
  })
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      return err;
    });
}
async function createDatabase() {
  connection.connect(); //创建连接
  let data = await querysql("create database blogsql"); //等待promise对象then,catch返回的对象
  if (data.error) {
    //创建出错，删除已有的数据库
    data = await querysql("drop database blogsql");
    if(data.error)return;
    data = await querysql("create database blogsql");
    if(data.error)return;
  }
  //切换到创建的blogsql数据库
  data = await querysql("use blogsql");
  if (data.error) {
    return null;
  }
  //创建管理员表
  data = await querysql(`
    create table users(
        id bigint primary key auto_increment,
        username varchar(32),
        password varchar(32),
        email varchar(100),
        avater varchar(100),
        nick varchar(100),
        authority text,
        role text,
        createTime timestamp
    ) ENGINE=InnoDB default charset=utf8mb4;
    `);
  if (data.error) {
    return null;
  }
  // 插入默认的超级管理员账号
  data = await querysql("insert into users(username,password,email,nick,createTime,authority,role) values('admin','admin','111@qq.com','test1',now(),'','')");
  if(data.error) return null;
  //创建文章表
  data = await querysql(`
     create table blog(
         id bigint primary key auto_increment,
         title varchar(100),
         keywords varchar(100),
         description varchar(500),
         content longtext,
         cover varchar(100),
         readCount int,
         showBlog char(2),
         blogType char(10),
         uid bigint,
         createTime timestamp
     ) ENGINE=InnoDB default charset=utf8mb4;
     `);
  if (data.error) {
    return null;
  }
  //创建评论表
  data = await querysql(`
       create table article(
           id bigint primary key auto_increment,
           content varchar(500),
           blogId bigint,
           uid bigint,
           createTime timestamp
       ) ENGINE=InnoDB default charset=utf8mb4;
       `);
  if (data.error) {
    return null;
  }
  console.log("数据库创建完成");
  connection.destroy();//关闭操作
}
createDatabase();
