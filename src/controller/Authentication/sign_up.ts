import { Request, Response } from "express";
import { User } from "../../model/user_model";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/databaseConnection";

 
export const Sign_up = async (req: Request, res: Response) => { 
  const { name, email, password, role } = req.body

  try {
   
    let user: any = new User();
    const userRepo = AppDataSource.getRepository(User)
      user.name = name,
      user.email = email,
      user.password = password,
      user.role = role
    const userInserted = await userRepo.save(user);  

    res.json({
      message:"Registration successfully",
      userData: userInserted 
    })
  } catch (error) {
    console.log(error);
    
    
    res.json({
      message: "Something going wrong",
      error:error
    })
  }



 
}