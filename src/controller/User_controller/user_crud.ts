import { Request, Response } from "express";
import { User } from "../../model/user_model";
import { AppDataSource } from "../../database/databaseConnection";
import { ErrorResponce, SuccesResponce } from "../Helper/helper_function";
import { messageData } from "../../Constant/message";

export const Add_user = async (req: Request, res: Response) => {
  const { user_name, email, password, roleId, remember_token, status } = req.body
  try {

    let user: any = new User();
    const userRepo = AppDataSource.getRepository(User)
      user.user_name = user_name ||"",
      user.email = email || "",
      user.password = password || "",
      user.roleId = roleId || "",
      user.status = status || "",
      user.remember_token = remember_token || ""
    const userInserted = await userRepo.save(user);
    SuccesResponce(res, userInserted, messageData.REGISTARTION_SUCCESSFULL)

  } catch (error) { 
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Edit_user = async (req: Request, res: Response) => {
  const { user_name, email, password, roleId, remember_token, status } = req.body
  try {

    let user: any = new User();
    const userRepo = AppDataSource.getRepository(User)
    user.user_name = user_name || "",
      user.email = email || "",
      user.password = password || "",
      user.roleId = roleId || "",
      user.status = status || "",
      user.remember_token = remember_token || ""
    const userInserted = await userRepo.save(user);
    SuccesResponce(res, userInserted, messageData.REGISTARTION_SUCCESSFULL)

  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}