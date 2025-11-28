import express from 'express';
import { addBook,getBooks,updateBook,getSingleBook,deleteBook } from '../controllers/bookController.js';

const bookRouter = express.Router();

bookRouter.post('/add',addBook)
bookRouter.get('/get',getBooks);
bookRouter.get('/get/:id',getSingleBook);
bookRouter.put('/update/:id',updateBook)
bookRouter.delete('/delete/:id',deleteBook)

export default bookRouter;