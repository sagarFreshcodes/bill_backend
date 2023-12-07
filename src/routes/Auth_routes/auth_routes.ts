import express from "express" 
import { verifyToken } from "../Middleware/middleware";
import { Log_in } from "../../controller/Authentication_controller/log_in";
import { Add_user } from "../../controller/User_controller/user_crud";
export const Auth_routes = express.Router()

Auth_routes.post("/signup", Add_user);  
Auth_routes.post("/signin", Log_in);  