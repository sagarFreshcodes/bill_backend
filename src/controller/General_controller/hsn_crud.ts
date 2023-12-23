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
import {
  AddMultipalRecord,
  AddRecord,
  ExportRecord,
  GetRecord,
  RelationOptionSchema,
  UpdateRecord,
} from "../Common/commonFunction";
import { Hsn } from "../../model/hsn";
const hsnRepo = AppDataSource.getRepository(Hsn);

export const Get_hsn = async (req: Request, res: Response) => {
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
    const relativeField = "null";
    GetRecord(
      hsnRepo,
      res,
      Hsn,
      objectForAdd,
      messageData.HSN_GET_SUCCESSFULL,
      {
        relativeField: relativeField,
        isFilter: Object.keys(ExtractFilterArray).length != 0,
        filterValue: filterValue,
        filterData: ExtractFilterArray,
        modelName: "Hsn",
        addConditionsForSearch: "null",
      }
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Add_hsn = async (req: Request, res: Response) => {
  try {
    const keysArray = [
      {
        description: "",
      },
      { hsn_code: 1 },
    ];
    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
    let record: any = new Hsn();
    record = { ...record, ...objectForAdd };
    console.log(record);

    const RelationOption: RelationOptionSchema = { isRelation: false };
    AddRecord(
      hsnRepo,
      record,
      res,
      messageData.HSN_ADD_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Edit_hsn = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const keysToExtract = ["hsn_code", "description"];
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);

    const RelationOption: RelationOptionSchema = { isRelation: false };
    UpdateRecord(
      hsnRepo,
      id,
      objectForUpadate,
      res,
      Hsn,
      messageData.HSN_UPDATE_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Import_hsn = async (req: any, res: Response) => {
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
        keysToKeep: ["hsn_code", "description"],
        idKey: "hsn_code",
      };

      const csvData: any = await parseCSVFile(req.files, options);
      let categoryTebale: any = new Hsn();
      console.log(`csvData--------`, csvData);
      const keysToKeep: any = ["hsn_code", "description"];
      const RelationOption: RelationOptionSchema = { isRelation: false };
      AddMultipalRecord(
        hsnRepo,
        categoryTebale,
        res,
        messageData.USER_ADD_SUCCESSFULL,
        csvData,
        Hsn,
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

export const Export_hsn = async (req: Request, res: Response) => {
  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: "" },
    { status: "" },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
  const keysToKeep = ["hsn_code", "description"];
  try {
    ExportRecord(
      hsnRepo,
      res,
      Hsn,
      objectForAdd,
      messageData.HSN_GET_SUCCESSFULL,
      keysToKeep,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};
