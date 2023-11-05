import { Request, Response } from "express";
import { User } from "../../model/user_model";
import { AppDataSource } from "../../database/databaseConnection";
import { Add_user_record, DeleteRecord, ErrorResponce, ExtractKeys, GetRecord, ObjectWithRequireKeysValue, UpdateRecord } from "../Helper/helper_function";
import { messageData } from "../../Constant/message";
import bcrypt from "bcrypt"
const userRepo = AppDataSource.getRepository(User)



export const Get_user = async (req: Request, res: Response) => {

  const keysArray = [
    { limit: 5 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: '' },
    { status: '' },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray)
  // const { limit, pageNo, orderBy, search } = req.body
  // const { fieldName, order } = orderBy
  // const params = { limit, pageNo, search, fieldName, order}

  console.log("params", objectForAdd);
  try {
    GetRecord(userRepo, res, User, objectForAdd)
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Add_user = async (req: Request, res: Response) => {
  try {

    // value of keysArray is provides default to save record if absence of any value in body of require key 
    const keysArray = [
      { user_name: '' },
      { email: '' },
      { password: '' },
      { role: req.body.roleId || '0' },
      { status: '1' },
      { remember_token: '' }
    ];

    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray) 
    const bcryptPwd = await bcrypt.hash(`${objectForAdd.password}`, 10); 
    let user: any = new User();
    user = { ...user, ...objectForAdd, password: bcryptPwd }
    Add_user_record(userRepo, user, res)
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}

export const Edit_user = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const keysToExtract = ['user_name', 'email', 'password', 'roleId', 'status'];
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);
    UpdateRecord(userRepo, id, objectForUpadate, res, User)
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