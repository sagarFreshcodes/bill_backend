import { Request, Response } from "express";
const secretkey = "secretkey"
import jwt from "jsonwebtoken" 
export const Log_in = (req:Request, res:Response) =>{

    const user = {
        id: 1,
        username: 'anil',
        email: 'webanilsidhu@gmail.com'
      }
    
      jwt.sign({ user },secretkey, { expiresIn: '2 days' }, (err: any, token:any) => {
        res.json({
          auth_token:token,
          message:"Log in successfully"
        });
      }); 
}