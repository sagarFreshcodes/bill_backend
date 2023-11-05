import express from "express"
import { verifyToken } from "../Middleware/middleware"; 
import { Add_category, Edit_category, Get_category, Import_category } from "../../controller/Category_controller/category_crud";
export const Category_routes = express.Router()

Category_routes.post("/get-categories", verifyToken, Get_category);
Category_routes.post("/add-category", verifyToken, Add_category);
Category_routes.post("/update-category", verifyToken, Edit_category); 
Category_routes.post("/import-category", verifyToken, Import_category); 