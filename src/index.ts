import express from 'express';
import "reflect-metadata"
import { Category_routes } from './routes/General_routes/category_routes';
import { ConnectDatabase } from "./database/databaseConnection"
import bodyParser from "body-parser";
import { Auth_routes } from './routes/Auth_routes/auth_routes';
import { User_routes } from './routes/User_routes/user_routes';
import { Common_routes } from './routes/General_routes/common_routes';
import fileupload from "express-fileupload";
import cors from "cors";
import { Test_routes } from './routes/General_routes/test_routes';
import { Attribute_routes } from './routes/General_routes/attributes_routes';
const app = express()
app.use(cors());
const port = 5503
const url = `mongodb://localhost:27017/testModel`
ConnectDatabase(url)




// Middlewares
// /* To handle invalid JSON data request */
// app.use(bodyParser.json({ limit: "50mb" }));

// /* For parsing urlencoded data */
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
// parse requests of content-type - form-data/multipart
app.use(express.json());
//for file upload
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
// app.get("/",async(req:Request,res:Response)=>{
//     const getRepo = AppDataSource.getRepository(Photo)
//     const allData =  await getRepo.find()
//     console.log(`getRepo.find()`,allData);

//     const data = new TestModel({
//         title:"gsdgsd",
//         author:"gdgdsg"
//     })

//     data.save()
// // res.send("hello world")
// res.json(allData)
// })

app.use(Test_routes, Auth_routes, Common_routes, Category_routes, User_routes, Attribute_routes)
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})