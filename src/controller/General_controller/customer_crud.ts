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
import { Customer } from "../../model/customer";
const customerRepo = AppDataSource.getRepository(Customer);

export const Get_customer = async (req: Request, res: Response) => {
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
    GetRecord(
      customerRepo,
      res,
      Customer,
      objectForAdd,
      messageData.CUSTOMER_GET_SUCCESSFULL,
      {
        relativeField: "null",
        isFilter: Object.keys(ExtractFilterArray).length != 0,
        filterValue: filterValue,
        filterData: ExtractFilterArray,
        modelName: "customer",
        addConditionsForSearch: "null",
      }
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Add_customer = async (req: Request, res: Response) => {
  try {
    const keysArray = [
      { category_name: "" },
      { status: 1 },
      { salutation: "" },
      { first_name: "" },
      { last_name: "" },
      { company_name: "" },
      { customer_display_name: "" },
      { work_phone: "" },
      { mobile: "" },
      { website: "" },
      { address_line_1: "" },
      { address_line_2: "" },
      { country_id: "" },
      { country: "" },
      { state_id: "" },
      { state: "" },
      { city_id: "" },
      { city: "" },
      { area: "" },
      { area_id: "" },
      { pincode: "" },
      { shipping_address_line_1: "" },
      { shipping_address_line_2: "" },
      { shipping_country_id: "" },
      { shipping_country: "" },
      { shipping_state_id: "" },
      { shipping_state: "" },
      { shipping_city: "" },
      { shipping_city_id: "" },
      { shipping_area: "" },
      { shipping_area_id: "" },
      { shipping_pincode: "" },
      { pan_card_no: "" },
      { aadhaar_card_no: "" },
      { gst_no: "" },
      { status: "" },
      { contact: "" },
      { type: "" },
    ];
    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
    let record: any = new Customer();
    record = { ...record, ...objectForAdd };

    const RelationOption: RelationOptionSchema = { isRelation: false };
    AddRecord(
      customerRepo,
      record,
      res,
      messageData.CUSTOMER_ADD_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Edit_customer = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const keysToExtract = keysForExtract;
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);

    const RelationOption: RelationOptionSchema = { isRelation: false };
    UpdateRecord(
      customerRepo,
      id,
      objectForUpadate,
      res,
      Customer,
      messageData.CUSTOMER_UPDATE_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Import_customer = async (req: any, res: Response) => {
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
        keysToKeep: keysForExtract,
        idKey: "category_name",
      };

      const csvData: any = await parseCSVFile(req.files, options);
      let categoryTebale: any = new Customer();
      console.log(`csvData--------`, csvData);
      const keysToKeep: any = keysForExtract;
      const RelationOption: RelationOptionSchema = { isRelation: false };
      AddMultipalRecord(
        customerRepo,
        categoryTebale,
        res,
        messageData.USER_ADD_SUCCESSFULL,
        csvData,
        Customer,
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

export const Export_customer = async (req: Request, res: Response) => {
  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: "" },
    { status: "" },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
  const keysToKeep = keysForExtract;
  try {
    ExportRecord(
      customerRepo,
      res,
      Customer,
      objectForAdd,
      messageData.CUSTOMER_GET_SUCCESSFULL,
      keysToKeep,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

const keysForExtract = [
  "category_name",
  "status",
  "salutation",
  "first_name",
  "last_name",
  "company_name",
  "customer_display_name",
  "work_phone",
  "mobile",
  "website",
  "address_line_1",
  "address_line_2",
  "country_id",
  "country",
  "state_id",
  "state",
  "city_id",
  "city",
  "area",
  "area_id",
  "pincode",
  "shipping_address_line_1",
  "shipping_address_line_2",
  "shipping_country_id",
  "shipping_country",
  "shipping_state_id",
  "shipping_state",
  "shipping_city",
  "shipping_city_id",
  "shipping_area",
  "shipping_area_id",
  "shipping_pincode",
  "pan_card_no",
  "aadhaar_card_no",
  "gst_no",
  "status",
  "contact",
  "type",
];
