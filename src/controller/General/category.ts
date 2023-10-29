import { Request, Response, response } from "express"

export const Add_category = (req:any,res:Response)=>{

    res.json({data: req.authData|| "authdata" ,message: "hellow category"})
}