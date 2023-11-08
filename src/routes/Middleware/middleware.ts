import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { messageData } from '../../Constant/message';
import { ErrorResponce } from '../../controller/Helper/helper_function';
const secretkey = "secretkey"
const app = express();
const port = 3000;

// Middleware function for verifying JWT tokens
export function verifyToken(req:any , res:Response, next:NextFunction) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token 
    // Next middleware 
    
    jwt.verify(bearerToken, secretkey, (err:any, authData:any) => {
        if (err) { 
          ErrorResponce(res, {}, messageData.UNAUTHORIZED_REQUEST) 
     
          
        } else {
            console.log(authData);
            req.authData = authData
            next();
         
        }
      });
  
  } else {
    // Forbidden
    ErrorResponce(res, {}, messageData.UNAUTHORIZED_REQUEST) 
  }

}
 
