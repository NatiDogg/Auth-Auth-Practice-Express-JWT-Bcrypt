import ImageService from "../services/imageService.js"


export const uploadImage = async(req,res)=>{
      try {
         const {userId} = req.userInfo
         const file = req.file;
         const response = await ImageService.uploadImage(file,userId);
         res.status(201).json(response);
      } catch (error) {
         if(error.message.includes("file is required. please upload an image")){
            return res.status(400).json({
                success:false,
                message: error.message
            })
         }
         if(error.message.includes("something went wrong storing the image to the db")){
            return res.status(400).json({
                success:false,
                message: error.message
            })
         }

         res.status(500).json({
            sucess:false,
            message:error.message
         })
      }
} 
export const getImage = async (req,res)=>{
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 5;
          const skip = parseInt(page-1) * limit;
          const sortBy = req.query.sortBy || 'createdAt';
          const sortOrder = req.query.sortOrder === "asc" ? 1 : -1
          
         const response = await ImageService.getImage({page,limit,skip,sortBy,sortOrder});
         res.status(200).json(response);
      } catch (error) {
         if(error.message.includes("no image found to display!")){
            return res.status(404).json({
                success:false,
                message: error.message
            })
         }
         res.status(500).json({
            sucess:false,
            message:error.message
         })
      }
}

export const deleteImage = async(req,res)=>{
    try {
      const {userId} = req.userInfo;
      const idOfImageToBeDeleted = req.params.id;
      const response = await ImageService.deleteImage(userId,idOfImageToBeDeleted);
      res.status(201).json(response);
    } catch (error) {
       if(error.message.includes("image not found!")){
            return res.status(404).json({
                success:false,
                message: error.message
            })
         }
         if(error.message.includes("image cant be deleted by this user!")){
            return res.status(403).json({
                success:false,
                message: error.message
            })
         }
        res.status(500).json({
            sucess:false,
            message:error.message
         })
    }
}