import express from "express" 
import { verifyToken } from "../Middleware/middleware"; 
import { Add_user, Delete_user, Edit_user } from "../../controller/User_controller/user_crud";
export const User_routes = express.Router()

// User_routes.post("/get-all-users", verifyToken, Add_user);  
User_routes.post("/create-user", verifyToken, Add_user);  
User_routes.post("/update-user", verifyToken, Edit_user);  
User_routes.post("/delete-user", verifyToken, Delete_user);  
// User_routes.post("/login", Log_in);  