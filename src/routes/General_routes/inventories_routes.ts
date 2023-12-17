import express from "express"
import { verifyToken } from "../Middleware/middleware";  
import { Add_Inventories, Edit_Inventories, Export_Inventories, Get_Inventories, Import_Inventories } from "../../controller/General_controller/inventories_crud";
export const Inventories_routes = express.Router()

Inventories_routes.post("/get-inventories", verifyToken, Get_Inventories);
Inventories_routes.post("/add-inventory", verifyToken, Add_Inventories);
Inventories_routes.post("/update-inventory", verifyToken, Edit_Inventories); 
Inventories_routes.post("/import-inventories", verifyToken, Import_Inventories); 
Inventories_routes.post("/export-categories", verifyToken, Export_Inventories); 