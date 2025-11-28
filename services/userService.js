import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

class UserService {
   async Register({username,email,password,role}){
        try {
         const userExists = await userModel.findOne({$or: [{username},{email}]});
        if(userExists){
           throw new Error("user already registered!");
        }
         const hashedPassword = await bcrypt.hash(password,10);
         const newlyCreatedUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
         });
         return {
            success: true,
            message: "user registered successfully!",
             user: {
               id: newlyCreatedUser._id,
               username: newlyCreatedUser.username,
                email: newlyCreatedUser.email,
                role: newlyCreatedUser.role
               }

         }
         
        } catch (error) {
              throw Error(" user registration failed: "+error.message);
        }
        
   }
   async Login({username,password}){
       try {
          const user = await userModel.findOne({username});
       if(!user){
         throw new Error("user doesnt exist!");
       }
       const isPasswordCorrect = await bcrypt.compare(password,user.password);
       if(!isPasswordCorrect){
         throw new Error("invalid credentials!");
       }
       const accessToken = jwt.sign({
         userId: user._id,
         username: user.username,
         role: user.role

       },process.env.JWT_SECRET_KEY, {expiresIn: "20m"});


       return {
         success: true,
         message: "user logged in successfully!",
         accessToken: accessToken
       }
       } catch (error) {
          throw new Error("user login failed: "+error.message);
       }
   }
   async changePassword(userId,oldPassword,newPassword){
       try {
         const user = await userModel.findById(userId);
     
      
      if(!user){
         throw new Error("user not found!");
      }
      const isOldPasswordCorrect = await bcrypt.compare(oldPassword,user.password);
      if(!isOldPasswordCorrect){
         throw new Error("Invalid credentials.");
      }
      if (oldPassword === newPassword) {
         throw new Error("New password cannot be the same as the old password.");
       }    

      const newHashedPassword = await bcrypt.hash(newPassword,10);
      user.password = newHashedPassword;
      await user.save();
       return {
         success:true,
         message: "password changed successfully!"
       }

       } catch (error) {
         throw new Error("error changing password: "+error.message);
       }

   }
}

export default new UserService;