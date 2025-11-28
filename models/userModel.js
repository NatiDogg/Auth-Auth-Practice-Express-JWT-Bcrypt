import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
            
        },
        email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "user"],
             default: "user"
        }
},{timestamps: true});

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;