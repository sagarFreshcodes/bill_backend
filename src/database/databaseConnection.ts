import mongoose from "mongoose"

export const ConnectDatabase = (url:string)=>{
    mongoose.connect(url).then(()=>console.log("Database connected")
    ).catch((error)=>{console.log("Error in database connection",error);
    })
}