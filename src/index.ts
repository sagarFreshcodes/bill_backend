import express, { Express, Request, Response } from 'express'; 
import "reflect-metadata"
import { DataSource } from 'typeorm';
import {ConnectDatabase} from "./database/databaseConnection"
import {Photo, TestModel} from "./model/testModel"
const app = express()
const port = 5500
const url = `mongodb://localhost:27017/testModel`
ConnectDatabase(url)


const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port: 5432,
    username:"postgres",
    password:"sagar123",
    database:"postgres",
    synchronize: true,
    logging: true,
    entities: ["src/model/*{.ts,.js}"],
})

AppDataSource.initialize().then(()=>{console.log("postgresdb connect")}).catch((error)=>{console.log("Error in pg connection", error);
}); 
app.get("/",async(req:Request,res:Response)=>{
    const getRepo = AppDataSource.getRepository(Photo)
    const allData =  await getRepo.find()
    console.log(`getRepo.find()`,allData);
    
    const data = new TestModel({
        title:"gsdgsd",
        author:"gdgdsg"
    })

    data.save()
// res.send("hello world")
res.json(allData)
})
app.listen(port,()=>{console.log(`server running on http://localhost:${port}`);
})