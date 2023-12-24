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
import { Companies } from "../../model/company";
const companiesRepo = AppDataSource.getRepository(Companies);

export const Get_companies = async (req: Request, res: Response) => {
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
      companiesRepo,
      res,
      Companies,
      objectForAdd,
      messageData.COMPANY_GET_SUCCESSFULL,
      {
        relativeField: relativeField,
        isFilter: Object.keys(ExtractFilterArray).length != 0,
        filterValue: filterValue,
        filterData: ExtractFilterArray,
        modelName: "companies",
        addConditionsForSearch: "null",
      }
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Add_companies = async (req: Request, res: Response) => {
  try {
    const keysArray = keysForKeepObject;

    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
    let record: any = new Companies();
    record = { ...record, ...objectForAdd };
    console.log(record);

    const RelationOption: RelationOptionSchema = { isRelation: false };
    AddRecord(
      companiesRepo,
      record,
      res,
      messageData.COMPANY_ADD_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Edit_companies = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const keysToExtract = keysForKeep;
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);

    const RelationOption: RelationOptionSchema = { isRelation: false };
    UpdateRecord(
      companiesRepo,
      id,
      objectForUpadate,
      res,
      Companies,
      messageData.COMPANY_UPDATE_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Import_companies = async (req: any, res: Response) => {
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
        keysToKeep: keysForKeep,
        idKey: "Companies_code",
      };

      const csvData: any = await parseCSVFile(req.files, options);
      let categoryTebale: any = new Companies();
      console.log(`csvData--------`, csvData);
      const keysToKeep: any = keysForKeep;
      const RelationOption: RelationOptionSchema = { isRelation: false };
      AddMultipalRecord(
        companiesRepo,
        categoryTebale,
        res,
        messageData.USER_ADD_SUCCESSFULL,
        csvData,
        Companies,
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

export const Export_companies = async (req: Request, res: Response) => {
  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: "" },
    { status: "" },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
  const keysToKeep = keysForKeep;
  try {
    ExportRecord(
      companiesRepo,
      res,
      Companies,
      objectForAdd,
      messageData.COMPANY_GET_SUCCESSFULL,
      keysToKeep,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

const keysForKeep = [
  "company_name",
  "service_type_id",
  "logo",
  "primary_email",
  "primary_contact",
  "secondary_contact",
  "secondary_email",
  "whatsapp_no",
  "address_line_1",
  "address_line_2",
  "address_line_3",
  "shipping_address_line_1",
  "shipping_address_line_2",
  "shipping_address_line_3",
  "city_id",
  "city",
  "state_id",
  "state",
  "country_id",
  "shipping_state_id",
  "shipping_country_id",
  "country",
  "pincode",
  "shipping_city",
  "shipping_state",
  "shipping_country",
  "shipping_pincode",
  "cst_no",
  "cst_date",
  "ecc_no",
  "ecc_date",
  "tan_no",
  "gst_no",
  "bank_name",
  "acc_no",
  "ifsc_code",
  "branch_name",
  "account_name",
  "status",
];

const keysForKeepObject = [
  { company_name: "null" },
  { service_type_id: "null" },
  { logo: "null" },
  { primary_email: "null" },
  { primary_contact: "null" },
  { secondary_contact: "null" },
  { secondary_email: "null" },
  { whatsapp_no: "null" },
  { address_line_1: "null" },
  { address_line_2: "null" },
  { address_line_3: "null" },
  { shipping_address_line_1: "null" },
  { shipping_address_line_2: "null" },
  { shipping_address_line_3: "null" },
  { city_id: "null" },
  { city: "null" },
  { state_id: "null" },
  { state: "null" },
  { country_id: "null" },
  { shipping_state_id: "null" },
  { shipping_country_id: "null" },
  { country: "null" },
  { pincode: "null" },
  { shipping_city: "null" },
  { shipping_state: "null" },
  { shipping_country: "null" },
  { shipping_pincode: "null" },
  { cst_no: "null" },
  { cst_date: "null" },
  { ecc_no: "null" },
  { ecc_date: "null" },
  { tan_no: "null" },
  { gst_no: "null" },
  { bank_name: "null" },
  { acc_no: "null" },
  { ifsc_code: "null" },
  { branch_name: "null" },
  { account_name: "null" },
  { status: "null" },
];
