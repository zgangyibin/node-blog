import mysqlPool from "../mysql";
import { BlogData } from "../config/varType";
export default {
    //添加博客
    addBlog(data:BlogData){
        return new Promise((resolve,reject)=>{
            mysqlPool.getConnection(function(err:Error,conn:any){
                if(err){
                 console.log(err);
                 reject({err});
                 conn.release();//释放连接对象，还回连接池
                 return;
                }
                const {
                    title,keywords,description,detail,img,showBlog,uid,blogType
                }=data;
                const sqlstr = "insert into blog(title,keywords,description,content,cover,showBlog,uid,blogType,createTime,readCount) values(?,?,?,?,?,?,?,?,now(),0)";
                const sqlstrParmas = [title,keywords,description,detail,img,showBlog,uid,blogType];
                conn.query(sqlstr,sqlstrParmas,function(err:Error,result:any){
                   resolve({err,result});
                })
             })
        }).then((data)=>data).catch((err)=>err);
         //调用数据库连接池的连接对象，conn是一个数据库连接对象
    },
    // 获取博客列表
    getList(uid: any, page: number){
        return new Promise((resolve,reject)=>{
          mysqlPool.getConnection(function(err:Error,conn:any){
            if(err){
              reject({err})
              conn.release();
              return;
            }
            // 如果直接把前端的字符串拼接到sql语句，容易被sql注入攻击。
            // 需要把前端输入的内容作为字符串，用？占位符。
            // limit start, count; 限制数据显示条数。start开始显示数据的条，count总共显示多少条。
            const sqlstr = `select blog.id,blog.title,blog.img,blog.keywords,blog.readCount,blog.blogType,blog.createTime,users.nick from users,blog where blog.uid=users.id and blog.uid=? order by id desc limit ?,20`;
            const sqlstrParam = [uid, (page-1)*20]
            conn.query(sqlstr,sqlstrParam,function(err:Error,result: any){
              conn.release();
              resolve({err, result});
            })
          })
        }).then((data)=>data).catch((err)=>err)
      },
      // 返回博客详情
      getBlogDetail(id: any){
        return new Promise((resolve,reject)=>{
          mysqlPool.getConnection(function(err:Error,conn:any){
            if(err){
              reject({err})
              conn.release();
              return;
            }

            const sqlstr = `select content from blog where id=? order by id`;
            const sqlstrParam = [id]
            conn.query(sqlstr,sqlstrParam,function(err:Error,result: any){
              conn.release();
              resolve({err, result});
            })
          })
        }).then((data)=>data).catch((err)=>err)
      },
      // 获取博客总数
      getListCount(uid:string){
        return new Promise((resolve,reject)=>{
          mysqlPool.getConnection(function(err:Error,conn:any){
            if(err){
              reject({err})
              conn.release();
              return;
            }
            // 如果直接把前端的字符串拼接到sql语句，容易被sql注入攻击。
            // 需要把前端输入的内容作为字符串，用？占位符。
            // limit start, count; 限制数据显示条数。start开始显示数据的条，count总共显示多少条。
            const sqlstr = `select count(id) as total from blog where uid=?`;
            const sqlstrParam = [uid]
            conn.query(sqlstr,sqlstrParam,function(err:Error,result: any){
              conn.release();
              resolve({err, result});
            })
          })
        }).then((data)=>data).catch((err)=>err)
      },
    //删除博客
    delBlog(id:any){
    return new Promise((resolve,reject)=>{
        mysqlPool.getConnection(function(err:Error,conn:any){
            if(err){
                reject({err})
                conn.release();//释放连接对象，还回连接池
                return;
            }
            const sqlstr = `delete from blog where id=?`;
            const sqlstrParmas = [id];
            conn.query(sqlstr,sqlstrParmas,function(err:Error,result:any){
                resolve({err,result});
            })
        })
    }).then((data)=>data).catch((err)=>err);
    },
    // 修改用户
    updateBlog(data:BlogData){
        return new Promise((resolve,reject)=>{
            mysqlPool.getConnection(function(err:Error,conn:any){
                if(err){
                 console.log(err);
                 reject({err});
                 conn.release();//释放连接对象，还回连接池
                 return;
                }
                const {
                    title,keywords,description,content,cover,showBlog,blogType,id
                }=data;
                const sqlstr = "update blog set title=?,keywords=?,description=?,content=?,cover=?,showBlog=?,blogType=? where id=?";
                const sqlstrParmas = [title,keywords,description,content,cover,showBlog,blogType,id];
                conn.query(sqlstr,sqlstrParmas,function(err:Error,result:any){
                   resolve({err,result});
                })
             })
        }).then((data)=>data).catch((err)=>err);
         //调用数据库连接池的连接对象，conn是一个数据库连接对象
    },
}