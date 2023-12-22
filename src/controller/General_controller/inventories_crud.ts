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
  AddInventoryRecord,
  AddMultipalRecord,
  AddRecord,
  ExportRecord,
  GetRecord,
  GetTestData2,
  RelationOptionSchema,
  UpdateRecord,
} from "../Common/commonFunction";
import { Inventories } from "../../model/inventory";
import { InventoryAttributes } from "../../model/inventoryAttributes";
const InventoriesRepo = AppDataSource.getRepository(Inventories);

export const Get_Inventories = async (req: Request, res: Response) => {
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
    const relativeField = "inventory_attributes";
    GetTestData2(
      InventoriesRepo,
      res,
      Inventories,
      objectForAdd,
      messageData.INVENTORY_GET_SUCCESSFULL,
      {
        relativeField: relativeField,
        isFilter: Object.keys(ExtractFilterArray).length != 0,
        filterValue: filterValue,
        filterData: ExtractFilterArray,
        modelName: "Inventories",
        addConditionsForSearch: "null",
      }
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Add_Inventories = async (req: Request, res: Response) => {
  try {
    const keysArray = [
      { sql_no: "" },
      { product_name: "" },
      { product_price: "" },
      { inhouse_date: "" },
      { stock_in: "" },
      { stock_out: "" },
      { purchase_date: "" },
      { in_out_status: "" },
      { remarks: "" },
      { brand: "" },
      { model_no: "" },
      { generation: "" },
      { processor: "" },
      { status: "" },
      { inventories: "" },
    ];
    const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
    let inventories: any = new Inventories();
    inventories = { ...inventories, ...objectForAdd };
    console.log("inventories=========", inventories);
    const relativeRepo = AppDataSource.getRepository(InventoryAttributes);
    const RelationOption: RelationOptionSchema = {
      isRelation: true,
      relativeRepo,
    };
    const AttributesList = [{ 248: "value1" }, { 247: "value2" }];
    AddInventoryRecord(
      InventoriesRepo,
      inventories,
      res,
      messageData.INVENTORY_ADD_SUCCESSFULL,
      RelationOption,
      { AttributesList: AttributesList },
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Edit_Inventories = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const keysToExtract = [
      "sql_no",
      "product_name",
      "product_price",
      "inhouse_date",
      "stock_in",
      "stock_out",
      "purchase_date",
      "in_out_status",
      "remarks",
      "brand",
      "model_no",
      "generation",
      "processor",
      "status",
      "inventories",
    ];
    const objectForUpadate = ExtractKeys(req.body, keysToExtract);

    const RelationOption: RelationOptionSchema = { isRelation: false };
    UpdateRecord(
      InventoriesRepo,
      id,
      objectForUpadate,
      res,
      Inventories,
      messageData.INVENTORY_UPDATE_SUCCESSFULL,
      RelationOption,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};

export const Import_Inventories = async (req: any, res: Response) => {
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
        keysToKeep: ["Inventories_name", "status"],
        idKey: "Inventories_name",
      };

      const csvData: any = await parseCSVFile(req.files, options);
      let InventoriesTebale: any = new Inventories();
      console.log(`csvData--------`, csvData);
      const keysToKeep: any = ["status", "Inventories_name"];
      const RelationOption: RelationOptionSchema = { isRelation: false };
      AddMultipalRecord(
        InventoriesRepo,
        InventoriesTebale,
        res,
        messageData.USER_ADD_SUCCESSFULL,
        csvData,
        Inventories,
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

export const Export_Inventories = async (req: Request, res: Response) => {
  const keysArray = [
    { limit: 10 },
    { pageNo: 1 },
    { orderBy: {} },
    { search: "" },
    { status: "" },
  ];

  const objectForAdd = ObjectWithRequireKeysValue(req.body, keysArray);
  const keysToKeep = ["status", "Inventories_name"];
  try {
    ExportRecord(
      InventoriesRepo,
      res,
      Inventories,
      objectForAdd,
      messageData.INVENTORY_GET_SUCCESSFULL,
      keysToKeep,
      {}
    );
  } catch (error) {
    ErrorResponce(res, error, messageData.UNKNOWN);
  }
};
