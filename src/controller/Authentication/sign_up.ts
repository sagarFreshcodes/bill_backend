import { Request, Response } from "express";
import { User } from "../../model/Authentication/user_model";
import AppDataSource from "typeorm"; 

export const Sign_up = async (req: Request, res: Response) => {
  console.log("req===============>", req.body);
  const testData = req
  // const { name, email, password, role } = req.body

  try {
   
    // let user: User = new User();
    // const userRepo = AppDataSource.getRepository(User)
    //   user.name = name,
    //   user.email = email,
    //   user.password = password,
    //   user.role = role
    // const userInserted = await userRepo.save(user); 

    res.json({
      message:"Registration successfully",
      // userData: userInserted
      // testData: testData
    })
  } catch (error) {
    
    
    res.json({
      message: "Something going wrong",
      error:error
    })
  }



 
}