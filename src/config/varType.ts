// 所有变量类型都在该文件创建
import { Request,Response,Express} from "express"; 
interface BlogData {
    id?:string | number,
    title: string,
    keywords:string,
    description:string,
    content:string,
    cover:string,
    readCount:number,
    showBlog?:string | number,
    blogType:string,
    uid?:string,
    createTime:string,
    img?:string,
    detail?:string
}

export {
    Request,Response,Express,BlogData
}