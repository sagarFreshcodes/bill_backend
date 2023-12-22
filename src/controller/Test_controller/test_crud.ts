import { Request, Response } from "express";
import { AppDataSource } from "../../database/databaseConnection";
import {
  Add_user_record,
  DeleteRecord,
  ErrorResponce,
  ExtractFilterArrayWithKey,
  ExtractKeys,
  GetUserRecord,
  ObjectWithRequireKeysValue,
  ReturnFilterValue,
  parseCSVFile,
  removeQuotesFromKeys,
} from "../Helper/helper_function";
import { messageData } from "../../Constant/message";
import { Test } from "../../model/test";
import {
  AddMultipalRecord,
  AddRecord,
  ExportRecord,
  GetRecord,
  GetTestData,
  GetTestData2,
  RelationOptionSchema,
  UpdateRecord,
} from "../Common/commonFunction";
const TestRepo = AppDataSource.getRepository(Test);

export const Get_Test = async (req: Request, res: Response) => {
  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: "" },
    { status: "" },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);

  try {
    const ExtractFilterArray = ExtractFilterArrayWithKey(req.body);
    const filterValue = ReturnFilterValue(ExtractFilterArray);
    const relativeField = "no";
    GetTestData(
      TestRepo,
      res,
      Test,
      objectForAdd,
      messageData.TEST_GET_SUCCESSFULL,
      {
        relativeField: relativeField,
        isFilter: Object.keys(ExtractFilterArray).length != 0,
        filterValue: filterValue,
        filterData: ExtractFilterArray,
        modelName: "Test",
      }
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Add_Test = async (req: Request, res: Response) => {
  try {
    const keysArray = [{ Test_name: "" }, { status: 1 }];
    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
    let user: any = new Test();
    user = { ...user, ...objectForAdd };
    console.log(user);
    const RelationOption: RelationOptionSchema = { isRelation: false };
    AddRecord(
      TestRepo,
      user,
      res,
      messageData.USER_ADD_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Edit_Test = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const keysToExtract = ["Test_name", "status"];
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);
    const RelationOption: RelationOptionSchema = { isRelation: false };
    UpdateRecord(
      TestRepo,
      id,
      objectForUpadate,
      res,
      Test,
      messageData.TEST_UPDATE_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Import_Test = async (req: any, res: Response) => {
  try {
    if (!req.files) {
      console.log("csvData", typeof req.files);
      return res.status(400).send("No file uploaded.");
    } else {
      interface FilterOptions {
        keysToKeep: string[]; // Keys to keep in each object
        idKey: string; // Array of valid keys that must match
      }

      const options: FilterOptions = {
        keysToKeep: ["Test_name", "status"],
        idKey: "id",
      };

      const csvData: any = await parseCSVFile(req.files, options);
      let TestTebale: any = new Test();
      console.log(`csvData--------`, csvData);
      const keysToKeep = ["status", "category_name"];

      const RelationOption: RelationOptionSchema = { isRelation: false };
      AddMultipalRecord(
        TestRepo,
        TestTebale,
        res,
        messageData.USER_ADD_SUCCESSFULL,
        csvData,
        Test,
        keysToKeep,
        RelationOption,
        {}
      );
    }
  } catch (error) {
    console.log(error);

    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Export_Test = async (req: Request, res: Response) => {
  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: "" },
    { status: "" },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
  const keysToKeep = ["status", "Test_name"];
  try {
    ExportRecord(
      TestRepo,
      res,
      Test,
      objectForAdd,
      messageData.TEST_GET_SUCCESSFULL,
      keysToKeep,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};
