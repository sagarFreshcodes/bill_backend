import { Request, Response } from "express";
import { Authenticator } from "../../model/authenticator_model"; 
import { AppDataSource } from "../../database/databaseConnection"; 
import { ErrorResponce, SuccesResponce } from "../Helper/helper_function";
import { messageData } from "../../Constant/message";

export const Sign_up = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body

  try {

    let user: any = new Authenticator();
    const userRepo = AppDataSource.getRepository(Authenticator)
    user.name = name,
      user.email = email,
      user.password = password,
      user.role = role
    const userInserted = await userRepo.save(user);
    SuccesResponce(res, userInserted, messageData.REGISTARTION_SUCCESSFULL)
 
  } catch (error) {
    console.log(error);
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
  
}