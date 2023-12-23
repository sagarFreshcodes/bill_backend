import express from "express";
import { verifyToken } from "../Middleware/middleware";
import {
  Add_hsn,
  Edit_hsn,
  Export_hsn,
  Get_hsn,
  Import_hsn,
} from "../../controller/General_controller/hsn_crud";
export const Hsn_routes = express.Router();

Hsn_routes.post("/get-hsn", verifyToken, Get_hsn);
Hsn_routes.post("/add-hsn", verifyToken, Add_hsn);
Hsn_routes.post("/update-hsn", verifyToken, Edit_hsn);
Hsn_routes.post("/import-hsn", verifyToken, Import_hsn);
Hsn_routes.post("/export-hsn", verifyToken, Export_hsn);
