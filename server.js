import express from 'express';
import {config} from 'dotenv';
import connectToDb from './config/connectDB.js';
import bookRouter from './routes/bookRoutes.js'
import userRouter from './routes/userRoutes.js';
import homeRouter from './routes/homeRoutes.js';
import imageRouter from './routes/imageRoutes.js';

config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

//routes
app.use('/api/book',bookRouter);
app.use('/api/user',userRouter);
app.use('/api/home',homeRouter);
app.use('/api/image',imageRouter);
const startServer = async ()=>{
     try {
           
          await connectToDb();
          
          app.listen(port,()=>{
            console.log("server started listening to port "+port);
          })
     } catch (error) {
         console.log(error.message);
         process.exit(1);
     }
}

startServer();