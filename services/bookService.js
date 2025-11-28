import bookModel from "../models/bookModel.js";
class BookService {
   async addBook(data){
      try {
        const newBook = await bookModel.create(data);
        return {
            success:true,
            message: "book added successfully!",
            book: newBook
        }
      } catch (error) {
        throw new Error(`add book failed: ${error.message}`)
      }
   }
   async getBooks(){
           try {
            const books = await bookModel.find({});
             if(books.length < 1){
                throw new Error('no book found to retrieve')
             }
             return {
                success: true,
                message: "books retrieved successfully!",
                books: books
             }
           } catch (error) {
              throw Error("retrieving books failed: "+error.message)
           }
   }
   async getSingleBook(id){
      try {
        const book = await bookModel.findById(id);
         
       if (!book) {
           throw new Error("Book not found");
       }
       return  {
        success: true,
        message: "book retrieved successfully!",
        book: book
       }
      } catch (error) {
         throw new Error("retrieving book failed: "+error.message)
      }
   }
   async updateBook(data,id){
       try {
         const book = await bookModel.findByIdAndUpdate(id,data, {new: true});
       if(!book){
        throw new Error("book not found to update please try different book id");
       }
        return {
            success:true,
            message: "book updated successfully!",
            book: book
        }

       } catch (error) {
         throw new Error("updating book failed: "+error.message)
       }

   }
   async deleteBook(id){
        try {
          const deletedBook = await bookModel.findByIdAndDelete(id);
           if(!deletedBook){
            throw new Error("book not found to delete")
           }
           return {
            success:true,
            message: "book deleted successfully!",
            book: deletedBook
           }
        } catch (error) {
             throw new Error("deleting book failed: "+error.message);
        }
   }
}

export default new BookService;