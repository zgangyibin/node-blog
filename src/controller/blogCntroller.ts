import { Request,Response,Express} from "express"; 
import blogModel from "../model/blogModel";
let fs = require("fs");
export default function(app:Express,rootPath:string){ 
    //添加博客
    app.post("/api/addBlog",async function(req:Request,res:Response){
        let data:any =await blogModel.addBlog(req.body)
        const {err,result} = data;
        if(err){
            res.json({success:false,message:err.message});
        }else {
            res.json({success:true,message:"成功"});
        }
    });
    //获取博客列表
    app.post("/api/getBlogList",async function(req:Request,res:Response){ // 用户注册接口
        const { page } = req.body; // 获取？后传递的参数用query
        const uid:string = (req as any).uid;
        let data:any = await blogModel.getList(uid,Number(page));
        let {err, result} = data;
        console.log(uid, "用户uid")
        if(err){
          res.json({success:false, message: err.message})
          return;
        }
        data = await blogModel.getListCount(uid);//获取用户博客总数
        if(data.err){
          res.json({success:false, message: data.err.message})
          return;
        }
        res.json({success: true, data: result, total: data.result[0].total});
      }),
    //删除
    app.get("/api/delBlog",async function(req:Request,res:Response){
        const { id } = req.query;
        let data:any = await blogModel.delBlog(id);
        const {err,result} = data;
        if(err){
            res.json({success:false,message:err.message});
        }else {
            res.json({success:true,data:result});
        }
    })
    //修改博客
    app.post("/api/updateBlog",async function(req:Request,res:Response){
        let data:any =await blogModel.updateBlog(req.body)
        const {err,result} = data;
        if(err){
            res.json({success:false,message:err.message});
        }else {
            res.json({success:true,message:"注册成功"});
        }
    });
    //文件上传
    app.post("/api/adddetailimg",function(req:Request,res:Response){
       let name = (req as any).files[0].originalname;//获取上传图片名称
       let path = rootPath + "/static/blogimg/" + name;
       fs.readFile((req as any).files[0].path,function(err:Error,data:any){
        fs.writeFile(path,data,function(err:Error,data:any){
            if(err){
                res.json({success:false,errno:1,message:err.message});
                return;
            }
            res.json({success:true,erron:0,"data":{
                "url":name,//图片src,必须
                "alt":"",//图片描述文字，非必须
                "href":"",//图片链接，非必须
            }})
        })
       })
    })
    //文件删除
    app.post("/api/deldetailimg",function(req:Request,res:Response){
        const {file} = req.body;
        file.forEach(function( item:string ){
            let file = rootPath + "/static/blogimg/" + item;
            fs.unlink(file,function(err:Error){
                if(err){
                    console.log(err);
                }
            })
        })
        res.json({success:true,message:"删除成功"})
    })
}
