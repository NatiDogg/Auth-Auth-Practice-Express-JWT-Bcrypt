

export const isAdmin = (req,res,next)=>{
      const {role} = req.userInfo;
      if(role !== "admin"){
        return res.status(401).json({
            sucess: false,
            message: "unauthorized access!!"
        })
      }
      next();
}