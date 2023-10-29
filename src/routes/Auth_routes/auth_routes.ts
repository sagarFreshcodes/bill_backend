import express from "express"
import { Sign_up } from "../../controller/Authentication/sign_up";
import { verifyToken } from "../Middleware/middleware";
import { Log_in } from "../../controller/Authentication/log_in";
export const Auth_routes = express.Router()

Auth_routes.post("/signup", Sign_up);  
Auth_routes.post("/login", Log_in);  