import express from "express"
import { verifyToken } from "../Middleware/middleware";
import { Add_attribute, Edit_attribute, Export_attribute, Get_attribute, Import_attribute } from "../../controller/General_controller/attribute_crud";
export const Attribute_routes = express.Router()

Attribute_routes.post("/get-attributes", verifyToken, Get_attribute);
Attribute_routes.post("/add-attribute", verifyToken, Add_attribute);
Attribute_routes.post("/update-attribute", verifyToken, Edit_attribute);
Attribute_routes.post("/import-attributes", verifyToken, Import_attribute);
Attribute_routes.post("/export-attributes", verifyToken, Export_attribute); 