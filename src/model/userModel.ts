import mysqlPool from "../mysql";
export default {
    register(username:string,password:string,nick:string){
        return new Promise((resolve,reject)=>{
            mysqlPool.getConnection(function(err:Error,conn:any){
                if(err){
                 console.log(err);
                 reject({err});
                 conn.release();//释放连接对象，还回连接池
                 return;
                }
                const sqlstr = "insert into users(username,password,nick,createTime) values(?,?,?,now())";
                const sqlstrParmas = [username,password,nick];
                conn.query(sqlstr,sqlstrParmas,function(err:Error,result:any){
                   resolve({err,result});
                })
             })
        }).then((data)=>data).catch((err)=>err);
         //调用数据库连接池的连接对象，conn是一个数据库连接对象
    },
    login(username:string,password:string){
        return new Promise((resolve,reject)=>{
            mysqlPool.getConnection(function(err:Error,conn:any){
                if(err){
                 reject({err})
                 conn.release();//释放连接对象，还回连接池
                 return;
                }
                const sqlstr = `select id,nick,username from users where username=? and password=?`;
                const sqlstrParmas = [username,password];
                conn.query(sqlstr,sqlstrParmas,function(err:Error,result:any){
                 resolve({err,result});
                })
             })
        }).then((data)=>data).catch((err)=>err);
       
   },
   //获取用户列表
   getList(page:number){
    return new Promise((resolve,reject)=>{
        mysqlPool.getConnection(function(err:Error,conn:any){
            if(err){
                reject({err})
                conn.release();//释放连接对象，还回连接池
                return;
            }
            // limit start,count;限制数据显示条数，start开始显示数据的条，count总共显示多少条
            const sqlstr = `select id,username,password,nick,createTime from users limit ?,20`;
            const sqlstrParmas = [(page-1)*20];
            conn.query(sqlstr,sqlstrParmas,function(err:Error,result:any){
                resolve({err,result});
            })
        })
    }).then((data)=>data).catch((err)=>err);
   },
   //获取用户总数
     getListCount(){
        return new Promise((resolve,reject)=>{
            mysqlPool.getConnection(function(err:Error,conn:any){
                if(err){
                    reject({err})
                    conn.release();//释放连接对象，还回连接池
                    return;
                }
                const sqlstr = `select count(id) as total from users`;
                conn.query(sqlstr,function(err:Error,result:any){
                    resolve({err,result});
                })
            })
        }).then((data)=>data).catch((err)=>err);
       },
    //删除用户
    delAdminUser(id:any){
    return new Promise((resolve,reject)=>{
        mysqlPool.getConnection(function(err:Error,conn:any){
            if(err){
                reject({err})
                conn.release();//释放连接对象，还回连接池
                return;
            }
            const sqlstr = `delete from users where id=?`;
            const sqlstrParmas = [id];
            conn.query(sqlstr,sqlstrParmas,function(err:Error,result:any){
                resolve({err,result});
            })
        })
    }).then((data)=>data).catch((err)=>err);
    },
    // 修改用户
    updateAdminUser(password:string,nick:string,id:string){
        return new Promise((resolve,reject)=>{
            mysqlPool.getConnection(function(err:Error,conn:any){
                if(err){
                 console.log(err);
                 reject({err});
                 conn.release();//释放连接对象，还回连接池
                 return;
                }
                const sqlstr = "update users set password=?,nick=? where id=?";
                const sqlstrParmas = [password,nick,id];
                conn.query(sqlstr,sqlstrParmas,function(err:Error,result:any){
                   resolve({err,result});
                })
             })
        }).then((data)=>data).catch((err)=>err);
         //调用数据库连接池的连接对象，conn是一个数据库连接对象
    },
}