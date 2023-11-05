import express from "express"
import { verifyToken } from "../Middleware/middleware";
import { Add_user, Delete_user, Edit_user, Get_user } from "../../controller/User_controller/user_crud";
export const Category_routes = express.Router()

Category_routes.post("/get-all-users", verifyToken, Get_user);
Category_routes.post("/create-user", verifyToken, Add_user);
Category_routes.post("/update-user", verifyToken, Edit_user);
Category_routes.post("/delete-user", verifyToken, Delete_user);   