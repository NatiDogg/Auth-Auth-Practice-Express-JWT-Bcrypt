import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (filePath)=>{
        const result = await cloudinary.uploader.upload(filePath);
        const {secure_url,public_id} = result;
        return {
         url: secure_url,
         publicId: public_id
        }
}