import express from "express";
import { verifyToken } from "../Middleware/middleware";
import {
  Add_companies,
  Edit_companies,
  Export_companies,
  Get_companies,
  Import_companies,
} from "../../controller/General_controller/company_crud";
export const Company_routes = express.Router();

Company_routes.post("/get-company", verifyToken, Get_companies);
Company_routes.post("/add-company", verifyToken, Add_companies);
Company_routes.post("/update-company", verifyToken, Edit_companies);
Company_routes.post("/import-company", verifyToken, Import_companies);
Company_routes.post("/export-company", verifyToken, Export_companies);
