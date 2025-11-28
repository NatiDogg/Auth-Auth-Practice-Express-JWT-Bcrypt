import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
         title: {type: String, required: true, trim: true, maxLength: 100},
         author: {type: String, required: true},
         price: {type: Number,required: true},
         year: {type:Number, min: 1000, max: new Date().getFullYear()},
         createdAt: {type: Date, default: Date.now}
},{timestamps: true});

const bookModel = mongoose.models.book || mongoose.model("book",bookSchema);

export default bookModel;
