import express from 'express'
import { userRegister,userLogin,userChangePassword } from '../controllers/userController.js';
import { authMiddleWare } from '../middlewares/authMiddleware.js';
const userRouter = express.Router();
userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);
userRouter.post("/change-password",authMiddleWare,userChangePassword);



export default userRouter;