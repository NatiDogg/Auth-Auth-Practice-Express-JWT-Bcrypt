import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/')
    },
    filename: function (req,file,cb){
        const uniqueFileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname);

        cb(null,uniqueFileName);
    }
});
//file filter function
const checkFile = (req,file,cb)=>{
      if(file.mimetype.startsWith('image')){
        cb(null,true);
      }
      else{
        cb(new Error("this is not an image! please upload only images"));
      }
}

const upload = multer({
    storage: storage,
    fileFilter:checkFile,
    limits:{
        fileSize: 5 * 1024 * 1024 //5mb
    }
    
});
export default upload;