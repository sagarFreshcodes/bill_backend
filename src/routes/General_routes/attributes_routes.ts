import express from "express"
import { Add_category } from "../../controller/General/category";
import { verifyToken } from "../Middleware/middleware";
export const Category_routes = express.Router()

Category_routes.get("/",verifyToken, Add_category);  