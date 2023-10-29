import express, { Express, Request, Response } from 'express';
import "reflect-metadata"
import { Category_routes } from './routes/General_routes/category_routes'; 
import { ConnectDatabase } from "./database/databaseConnection"
import { Photo, TestModel } from "./model/testModel"
import { Auth_routes } from './routes/Auth_routes/auth_routes';
const app = express()
const port = 5500
const url = `mongodb://localhost:27017/testModel`
ConnectDatabase(url)


app.use(Auth_routes, Category_routes) 
 
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
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})