import { Request, Response } from "express"; 
import { AppDataSource } from "../../database/databaseConnection";
import { AddRecord, Add_user_record, DeleteRecord, ErrorResponce, ExtractKeys, GetRecord, GetUserRecord, ObjectWithRequireKeysValue, UpdateRecord } from "../Helper/helper_function";
import { messageData } from "../../Constant/message"; 
import { Category } from "../../model/category";
const userRepo = AppDataSource.getRepository(Category)



export const Get_category = async (req: Request, res: Response) => {

  const keysArray = [
    { limit: 5 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: '' },
    { status: '' },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray) 
 
  try {
    GetRecord(userRepo, res, Category, objectForAdd)
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Add_category = async (req: Request, res: Response) => {
  try {  
    const keysArray = [
      { category_name: '' }, 
      { status: '1' }, 
    ]; 
    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray)  
    let user: any = new Category();
    user = { ...user, ...objectForAdd  }
    AddRecord(userRepo, user, res)
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}
 
export const Edit_category = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const keysToExtract = ['category_name',   'status'];
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);
    UpdateRecord(userRepo, id, objectForUpadate, res, Category)
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Delete_category = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    DeleteRecord(userRepo, id, res)
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}