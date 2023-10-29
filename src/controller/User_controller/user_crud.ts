import { Request, Response } from "express";
import { User } from "../../model/user_model";
import { AppDataSource } from "../../database/databaseConnection";
import { AddRecord, DeleteRecord, ErrorResponce, ExtractKeys, ObjectWithRequireKeysValue, UpdateRecord } from "../Helper/helper_function";
import { messageData } from "../../Constant/message";
const userRepo = AppDataSource.getRepository(User)

export const Add_user = async (req: Request, res: Response) => { 
  try {

    // value of keysArray is provides default to save record if absence of any value in body of require key 
    const keysArray = [
      { user_name: '' },
      { email: '' },
      { password: '' },
      { roleId: '0' },
      { status: '0' },
      { remember_token: '' }
    ]; 

    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray)
    let user: any = new User();
    user = { ...user, ...objectForAdd}  
    AddRecord(userRepo, user,res) 
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Edit_user = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const keysToExtract = ['user_name', 'email', 'password', 'roleId', 'status', 'remember_token'];
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);
    UpdateRecord(userRepo, id, objectForUpadate, res)
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Delete_user = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    DeleteRecord(userRepo, id, res)
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}