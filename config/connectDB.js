import mongoose from "mongoose";

const connectToDb = async()=>{
     try {
         await mongoose.connect(process.env.MONGODB_URL);
         console.log("database connected successfully!");
     } catch (error) {
         console.log(error.message);
         process.exit(1);
     }
}
export default connectToDb;