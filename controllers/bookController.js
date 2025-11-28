import BookService from '../services/bookService.js';
export const addBook = async (req,res)=>{
       try {
        const response = await BookService.addBook(req.body);
         res.status(201).json(response);
       } catch (error) {
        res.status(500).json({
           success: false,
            message: error.message
          });
       }

}

export const getBooks = async(req,res)=>{
      try {
        const response = await BookService.getBooks();
          res.status(200).json(response);
      } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message
         })
      }
}
export const getSingleBook = async (req,res)=>{
     try {
        const response = await BookService.getSingleBook(req.params.id);
          res.status(200).json(response);
     } catch (error) {
          if(error.message.includes("Book not found")){
            return res.status(404).json({
                success: false,
                message: error.message
                
            })
          }
         res.status(500).json({
            success: false,
            message: error.message
         })
     }
}
export const updateBook = async (req,res)=>{
      try {
         const body = req.body;
    const {id} = req.params
   const response = await BookService.updateBook(body,id);
    res.status(201).json(response);
      } catch (error) {
          if(error.message.includes("book not found to update please try different book id")){
             return res.status(404).json({
                success: false,
                message: error.message
                
            })
          }
          res.status(500).json({
            success: false,
            message: error.message
         })
      }

}  

export const deleteBook = async (req,res)=>{
      try {
         const {id} = req.params;
        const response = await BookService.deleteBook(id);
        res.status(201).json(response);
      } catch (error) {
         if(error.message.includes("book not found to delete")){
            return res.status(404).json({
                success:false,
                message:error.message
             })
         }
         res.status(500).json({
            success: false,
            message: error.message
         })
      }
}