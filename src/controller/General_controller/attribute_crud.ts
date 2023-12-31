import { Request, Response } from "express";
import { AppDataSource } from "../../database/databaseConnection";
import { Add_user_record, DeleteRecord, ErrorResponce, ExtractFilterArrayWithKey, ExtractKeys, GetUserRecord, ObjectWithRequireKeysValue, ReturnFilterValue, parseCSVFile, removeQuotesFromKeys, } from "../Helper/helper_function";
import { messageData } from "../../Constant/message";
import { Attribute } from "../../model/attribute";
import { AddMultipalRecord, AddRecord, ExportRecord, GetRecord, UpdateRecord } from "../Common/commonFunction";
const attributeRepo = AppDataSource.getRepository(Attribute)

export const Get_attribute = async (req: Request, res: Response) => {

  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: '' },
    { status: '' },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray)

  try {
    const ExtractFilterArray = ExtractFilterArrayWithKey(req.body)
    const filterValue = ReturnFilterValue(ExtractFilterArray)
    GetRecord(attributeRepo, res, Attribute, objectForAdd, messageData.ATTRIBUTE_ADD_SUCCESSFULL, { isFilter: Object.keys(ExtractFilterArray).length != 0, filterValue: filterValue, filterData: ExtractFilterArray })
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Add_attribute = async (req: Request, res: Response) => {
  try {
    const keysArray = [
      { name: "" }, { status: 1 }, { category_id: "" }, { is_require: true }, { is_field: `text` }, { position: 1 },
    ];
    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray)
    let attribute: any = new Attribute();
    attribute = { ...attribute, ...objectForAdd }
    console.log(attribute);

    AddRecord(attributeRepo, attribute, res, messageData.ATTRIBUTE_ADD_SUCCESSFULL, {})
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}

export const Edit_attribute = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const keysToExtract = ['name', "is_field", "is_require", "category_id", 'status'];
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);
    UpdateRecord(attributeRepo, id, objectForUpadate, res, Attribute, messageData.ATTRIBUTE_UPDATE_SUCCESSFULL, {})
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Import_attribute = async (req: any, res: Response) => {
  try {
    if (!req.files) {
      console.log("csvData", typeof req.files);
      return res.status(400).send('No file uploaded.');
    } else {
      interface FilterOptions {
        keysToKeep: string[]; // Keys to keep in each object
        idKey: string; // Array of valid keys that must match
      }

      const options: FilterOptions = {
        keysToKeep: ["category_id", 'name', 'is_require', 'is_field', "status", "position"],
        idKey: 'id',
      };

      const csvData: any = await parseCSVFile(req.files, options);
      let attributeTable: any = new Attribute();
      console.log(`csvData--------`, csvData);
      const keysToKeep: any = ["category_id", 'name', 'is_require', 'is_field', "status", "position"]
      AddMultipalRecord(attributeRepo, attributeTable, res, messageData.ATTRIBUTE_ADD_SUCCESSFULL, csvData, Attribute, keysToKeep, {})
    }
  } catch (error) {
    console.log(error);

    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Export_attribute = async (req: Request, res: Response) => {

  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: '' },
    { status: '' },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray)
  const keysToKeep = ['status', 'attribute_name'];
  try {
    ExportRecord(attributeRepo, res, Attribute, objectForAdd, messageData.ATTRIBUTE_GET_SUCCESSFULL, keysToKeep, {})
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}