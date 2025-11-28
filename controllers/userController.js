import userService from "../services/userService.js";
import UserService from "../services/userService.js";

export const userRegister = async (req,res)=>{
       try {
        const {username,email,password,role} = req.body;
        const response = await UserService.Register({username,email,password,role});
        res.status(201).json(response);
       } catch (error) {
           if(error.message.includes("user already registered!")){
            return res.status(400).json({
              success: false,
              message: error.message
            })
           }
          res.status(500).json({
            success:false,
            message: error.message
          });
       }
}
export const userLogin = async (req,res)=>{
     try {
        const {username,password} = req.body;
        const response = await UserService.Login({username,password});
        res.status(201).json(response);
     } catch (error) {
           if(error.message.includes("invalid credentials!")){
            return res.status(400).json({
              success: false,
              message: error.message
            })
           }
       
         res.status(500).json({
            success:false,
            message: error.message
          });
     }
}
export const userChangePassword = async(req,res)=>{
       try {
        const {userId} = req.userInfo;
        const {oldPassword,newPassword} = req.body;
        const response = await userService.changePassword(userId,oldPassword,newPassword);
        res.status(201).json(response);
       } catch (error) {
           if(error.message.includes("invalid credentials!")){
            return res.status(400).json({
              success: false,
              message: error.message
            })
           }
           if(error.message.includes("New password cannot be the same as the old password.")){
            return res.status(400).json({
              success: false,
              message: error.message
            })
           }
          res.status(500).json({
            success:false,
            message: error.message
          });
       }
}