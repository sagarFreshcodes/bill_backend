import express from "express";
import { verifyToken } from "../Middleware/middleware";
import {
  Add_customer,
  Edit_customer,
  Export_customer,
  Get_customer,
  Import_customer,
} from "../../controller/General_controller/customer_crud";
export const Customer_routes = express.Router();

Customer_routes.post("/get-customers", verifyToken, Get_customer);
Customer_routes.post("/add-customer", verifyToken, Add_customer);
Customer_routes.post("/update-customer", verifyToken, Edit_customer);
Customer_routes.post("/import-customers", verifyToken, Import_customer);
Customer_routes.post("/export-customers", verifyToken, Export_customer);
