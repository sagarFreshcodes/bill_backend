import express from "express";
import { verifyToken } from "../Middleware/middleware";
import {
  DeleteAllRecords,
  DeleteMultipalRecords,
  GetFieldRecords,
} from "../../controller/Common/commonFunction";
import { Get_attribute_value } from "../../controller/General_controller/specific_crud";
export const Common_routes = express.Router();

Common_routes.post("/delete-multiple-data", verifyToken, DeleteMultipalRecords);
Common_routes.post("/delete-all-data", verifyToken, DeleteAllRecords);
Common_routes.post("/get-field-records", verifyToken, GetFieldRecords);
Common_routes.post("/get-attribute-values", verifyToken, Get_attribute_value);
