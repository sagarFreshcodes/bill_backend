import { Request, Response } from "express";
import { getRepository } from "typeorm";
// Import your User entity
const secretkey = "secretkey"
import jwt from "jsonwebtoken"
import { Users } from "../../model/user_model";
import { AppDataSource } from "../../database/databaseConnection";
import { messageData } from "../../Constant/message";
import { ErrorResponce, SuccessResponce } from "../Helper/helper_function";
export const Log_in = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(Users);
  const { email, password } = req.body
  let user = await userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email: email, password: password })
    .getOne();

  if (user) {
    if (user?.password == password) {
      const rollData = {
        "id": +user.role || user.role,
        "name": user.role == "3" ? "Technician" : user.role == "1" ? "Admin" : "User",
        "permission": {},
      }
      jwt.sign({ user }, secretkey, { expiresIn: '2 days' }, (err: any, token: any) => {
        const userWithToken = {
          ...user, authToken: token, role: rollData
        }
     

        SuccessResponce(res, { data: userWithToken }, messageData.LOGIN_SUCCESSFULL)
      });
    } else {
      ErrorResponce(res, {}, messageData.INVALID_EMAIL_PASS)
      
    }
  } else {
    ErrorResponce(res, {}, messageData.INVALID_EMAIL_PASS)
  }



}