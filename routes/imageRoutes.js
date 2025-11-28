import express from 'express'
import {uploadImage,getImage,deleteImage} from '../controllers/imageController.js';
import { authMiddleWare } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';
const imageRouter = express.Router();

imageRouter.post('/upload',authMiddleWare,isAdmin,upload.single("image"),uploadImage);
imageRouter.get('/get',authMiddleWare,getImage);
imageRouter.post('/delete/:id',authMiddleWare,isAdmin,deleteImage);

export default imageRouter;