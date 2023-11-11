import express from "express"
import { verifyToken } from "../Middleware/middleware";
import { Add_Test, Edit_Test, Export_Test, Get_Test, Import_Test } from "../../controller/Test_controller/test_crud";
export const Test_routes = express.Router()

Test_routes.post("/get-testData", verifyToken, Get_Test);
Test_routes.post("/add-testData", verifyToken, Add_Test);
Test_routes.post("/update-testData", verifyToken, Edit_Test);
Test_routes.post("/import-testData", verifyToken, Import_Test);
Test_routes.post("/export-testData", verifyToken, Export_Test); 