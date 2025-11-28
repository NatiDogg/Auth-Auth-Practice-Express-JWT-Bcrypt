import imageModel from "../models/imageModel.js";
import { uploadToCloudinary } from "../helpers/cloudinaryHelper.js";
import cloudinary from "../config/cloudinary.js";
import fs from 'fs'
class ImageService{
    async uploadImage(file,userId){
        try {
           if(!file){
              throw new Error("file is required. please upload an image");
           }
           // upload to cloudinary
           const {url,publicId} = await uploadToCloudinary(file.path);
           // store the url and publicId to the db
           const newlyUploadedImage = await imageModel.create({
              url,
              publicId,
              uploadedBy: userId
           });
           if(!newlyUploadedImage){
             throw new Error("something went wrong storing the image to the db");
           }

           //delete the file from local storage that has been stored by multer
             fs.unlinkSync(file.path);
           

           return {
            success:true,
            message: "image uploaded to cloudinary and stored to db successfully!",
            image: newlyUploadedImage
           }

        } catch (error) {
            throw new Error('error uploding image: '+error.message);
        }
    }

    async getImage({page,limit,skip,sortBy,sortOrder}){
         try {
            const totalImages = await imageModel.countDocuments();
            const totalPages = Math.ceil(totalImages / limit);
            const sortObj = {};
            sortObj[sortBy] = sortOrder;
             console.log(sortObj);
            const images = await imageModel.find({}).sort(sortObj).skip(skip).limit(limit);

            if(images.length ===0){
                throw new Error("no image found to display!")
            }
            return {
                success:true,
                currentPage:page,
                totalPages:totalPages,
                totalImages,totalImages,
                message: 'images retrieved successfully!',
                images: images
            }
         } catch (error) {
             throw new Error('error getting image: '+error.message);
         }
    }
    async deleteImage(userId,imageId){
         try {
            const image = await imageModel.findById(imageId);
            if(!image){
                throw new Error("image not found!")
            }
            //check if the image is uploaded by the current user who is trying to delete this image
            if(image.uploadedBy.toString() !== userId){
                throw new Error("image cant be deleted by this user!")
            }

            // delete this image first from cloudinary
             await cloudinary.uploader.destroy(image.publicId);
             const deletedImage = await imageModel.findByIdAndDelete(imageId);
             if(!deletedImage){
                 throw new Error("cant delete the image from the db please try later!") 
             }
             return {
                success:true,
                message: "image deleted successfully!"
             }
             
 

            
         } catch (error) {
             throw new Error('error deleting image: '+error.message);
         }
    }
}

export default new ImageService;