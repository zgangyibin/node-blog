import { Request,Response,Express} from "express"; 
import userModel from "../model/userModel";
let jwt = require("jsonwebtoken");//引入生成token模块
export default function(app:Express){ 
    app.post("/api/register",async function(req:Request,res:Response){
        const { email,password,nick } = req.body;
        let data:any =await userModel.register(email,password,nick)
        const {err,result} = data;
        if(err){
            res.json({success:false,message:err.message});
        }else {
            res.json({success:true,message:"注册成功"});
        }
    });
    app.post("/api/adminLogin",async function(req:Request,res:Response){
        const { username,password,yzm } = req.body;
        const sessionYzm = (req as any).session.yzm ;
        console.log((req as any).session.yzm )
        if(yzm!== sessionYzm){
            res.json({success:false,message:"验证码错误"});
            return;
        }
        //避免回调地狱
        let data:any = await userModel.login(username,password)
        const {err,result} = data;
        if(err){
            res.json({success:false,message:err.message});
        }else {
            if(result.length > 0){
                console.log(result);
                let token = jwt.sign({id:result[0].id},"111222myblog121212",{
                    expiresIn:24*60*60//配置token有效期为24小时
                });
                res.json({success:true,token,data:result[0]});
            }else {
                res.json({success:false,message:"用户名或密码错误"});
            }
            
        }
    });
    app.get("/api/getAdminUserList",async function(req:Request,res:Response){
        const { page } = req.query;
        let data:any = await userModel.getList(Number(page))
        const {err,result} = data;
        if(result.err){
            res.json({success:false,message:err.message});
        }else {
            if(err){
                res.json({success:false,message:err.message});
            }else {
                res.json({success:true,data:result,page});
            }
            
        }
    })
}
