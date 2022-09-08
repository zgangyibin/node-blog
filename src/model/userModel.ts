import mysqlPool from "../mysql";
export default {
    register(email:string,password:string,nick:string){
        return new Promise((resolve,reject)=>{
            mysqlPool.getConnection(function(err:Error,conn:any){
                if(err){
                 console.log(err);
                 reject({err});
                 conn.release();//释放连接对象，还回连接池
                 return;
                }
                const sqlstr = "insert into users(email,password,nick,createTime) values(?,?,?,now())";
                const sqlstrParmas = [email,password,nick];
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
            const sqlstr = `select id,username,nick,createTime from users limit ?,20`;
            const sqlstrParmas = [(page-1)*20];
            conn.query(sqlstr,sqlstrParmas,function(err:Error,result:any){
             resolve({err,result});
            })
         })
    }).then((data)=>data).catch((err)=>err);
   
},
}