import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
      url:{
        type: String,
        required: true
      },
      publicId: {
        type: String,
        required: true
      },
      uploadedBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
      }
},{timestamps: true});

const imageModel = mongoose.models.image || mongoose.model("image",imageSchema);

export default imageModel;