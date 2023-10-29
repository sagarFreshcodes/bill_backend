import { Request, Response } from "express";
const secretkey = "secretkey"
import jwt from "jsonwebtoken" 
export const Sign_up = (req:Request, res:Response) =>{

    const user = {
        id: 1,
        username: 'anil',
        email: 'webanilsidhu@gmail.com'
      }
    
      jwt.sign({ user },secretkey, { expiresIn: '300000s' }, (err: any, token:any) => {
        res.json({
          auth_token:token,
          message:"Sign up successfully"
        });
      }); 
}