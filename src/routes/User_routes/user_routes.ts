import express from "express"
import { verifyToken } from "../Middleware/middleware";
import { Add_category, Delete_category, Edit_category, Get_category } from "../../controller/Category_controller/category_crud"; 
export const User_routes = express.Router()

User_routes.post("/get-all-users", verifyToken, Get_category);
User_routes.post("/create-user", verifyToken, Add_category);
User_routes.post("/update-user", verifyToken, Edit_category);
User_routes.post("/delete-user", verifyToken, Delete_category);   