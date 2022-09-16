import { Express,Request,Response } from "express"
let jwt = require("jsonwebtoken");
const whiteRoute= [//不需要校验token路由
    "/api/addCreateAdminUser",
    "/api/adminLogin",
    "/yzm"
]
const middleArea = (app:Express)=>{
    //app.use是可以做中间键，所有路由进来之前都会先过app.use方法,类似路由守卫
    //next()可以往下执行
    app.use(function(req:Request,res:Response,next:()=>void){
        // 在中间键验证需要token校验的路由，并不是每个路由都需要校验，需要白名单放入不校验的路由
        console.log(req.url);
        let reg = /\/yzm\??.*/;//匹配验证码，路由后带有查询参数
        if(whiteRoute.includes(req.url) || reg.test(req.url)){
            next();
        }
        else {
            const token = req.headers.authorization;
            jwt.verify(token,"zzz222myblog121wcy",function(error:Error,result:any){
                if(error){
                    res.status(401).send("token校验出错，请重新登录");
                    return;
                }
                console.log(result);
                const {id,iat,exp} = result;
                //iat当前时间，exp过期时间
                if(exp >= iat){//没过期
                    (req as any).uid = id;//把用户id放在req对象，后面路由需要用到用户id可以直接调用req.uid获取
                    next();
                    return;
                }
                res.status(401).send("token过期，请重新登录");
                
            });
        }
    })
}

export default middleArea;