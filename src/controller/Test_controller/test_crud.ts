import { Request, Response } from "express";
import { AppDataSource } from "../../database/databaseConnection";
import { Add_user_record, DeleteRecord, ErrorResponce, ExtractKeys, GetUserRecord, ObjectWithRequireKeysValue, ReturnFilterValue, parseCSVFile, removeQuotesFromKeys, } from "../Helper/helper_function";
import { messageData } from "../../Constant/message";
import { Test } from "../../model/test";
import { AddMultipalRecord, AddRecord, ExportRecord, GetRecord, GetTestData, UpdateRecord } from "../Common/commonFunction";
const TestRepo = AppDataSource.getRepository(Test)

export const Get_Test = async (req: Request, res: Response) => {

  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: '' },
    { status: '' },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray)

  try {
    const data = [
      {
        "fieldname": "id",
        "value": [
         10,11
        ]
      },
      {
        "fieldname": "Test_name",
        "value": [
          "te10", "te2"
        ]
      }
    ]

    const filterValue = ReturnFilterValue(data)

    GetTestData(TestRepo, res, Test, objectForAdd, messageData.TEST_GET_SUCCESSFULL, { isFilter:true, filterValue: filterValue ,filterData:data})
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Add_Test = async (req: Request, res: Response) => {
  try {
    const keysArray = [
      { Test_name: '' },
      { status: 1 },
    ];
    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray)
    let user: any = new Test();
    user = { ...user, ...objectForAdd }
    console.log(user);

    AddRecord(TestRepo, user, res, messageData.USER_ADD_SUCCESSFULL, {})
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}

export const Edit_Test = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const keysToExtract = ['Test_name', 'status'];
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);
    UpdateRecord(TestRepo, id, objectForUpadate, res, Test, messageData.TEST_UPDATE_SUCCESSFULL, {})
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Import_Test = async (req: any, res: Response) => {


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
        keysToKeep: ['Test_name', 'status'],
        idKey: 'id',
      };

      const csvData: any = await parseCSVFile(req.files, options);
      let TestTebale: any = new Test();
      console.log(`csvData--------`, csvData);

      AddMultipalRecord(TestRepo, TestTebale, res, messageData.USER_ADD_SUCCESSFULL, csvData, Test ,{})
  
    }
  } catch (error) {
    console.log(error);

    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}


export const Export_Test = async (req: Request, res: Response) => {

  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: '' },
    { status: '' },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray)
  const keysToKeep = ['status', 'Test_name'];
  try {
    ExportRecord(TestRepo, res, Test, objectForAdd, messageData.TEST_GET_SUCCESSFULL, keysToKeep, {})
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN)
  }
}