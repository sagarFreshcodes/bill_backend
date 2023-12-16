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
import { Category } from "../../model/category";
import {
  AddMultipalRecord,
  AddRecord,
  ExportRecord,
  GetRecord,
  RelationOptionSchema,
  UpdateRecord,
} from "../Common/commonFunction";
const categoryRepo = AppDataSource.getRepository(Category);

export const Get_category = async (req: Request, res: Response) => {
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
    const relativeField = "attributes";
    GetRecord(
      categoryRepo,
      res,
      Category,
      objectForAdd,
      messageData.CATEGORY_GET_SUCCESSFULL,
      {
        relativeField: relativeField,
        isFilter: Object.keys(ExtractFilterArray).length != 0,
        filterValue: filterValue,
        filterData: ExtractFilterArray,
        modelName: "category",
      }
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Add_category = async (req: Request, res: Response) => {
  try {
    const keysArray = [{ category_name: "" }, { status: 1 }];
    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
    let user: any = new Category();
    user = { ...user, ...objectForAdd };
    console.log(user);

    const RelationOption: RelationOptionSchema = { isRelation: false };
    AddRecord(
      categoryRepo,
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

export const Edit_category = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const keysToExtract = ["category_name", "status"];
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);

    const RelationOption: RelationOptionSchema = { isRelation: false };
    UpdateRecord(
      categoryRepo,
      id,
      objectForUpadate,
      res,
      Category,
      messageData.CATEGORY_UPDATE_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Import_category = async (req: any, res: Response) => {
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
        keysToKeep: ["category_name", "status"],
        idKey: "id",
      };

      const csvData: any = await parseCSVFile(req.files, options);
      let categoryTebale: any = new Category();
      console.log(`csvData--------`, csvData);
      const keysToKeep: any = ["status", "category_name"];
      const RelationOption: RelationOptionSchema = { isRelation: false };
      AddMultipalRecord(
        categoryRepo,
        categoryTebale,
        res,
        messageData.USER_ADD_SUCCESSFULL,
        csvData,
        Category,
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

export const Export_category = async (req: Request, res: Response) => {
  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: "" },
    { status: "" },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
  const keysToKeep = ["status", "category_name"];
  try {
    ExportRecord(
      categoryRepo,
      res,
      Category,
      objectForAdd,
      messageData.CATEGORY_GET_SUCCESSFULL,
      keysToKeep,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};
