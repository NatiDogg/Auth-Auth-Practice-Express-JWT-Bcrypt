import express from 'express'
import { authMiddleWare } from '../middlewares/authMiddleware.js';
import {welcomeHome} from '../controllers/homeController.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const homeRouter = express.Router();

homeRouter.get('/welcome',authMiddleWare,isAdmin,welcomeHome);

export default homeRouter;






