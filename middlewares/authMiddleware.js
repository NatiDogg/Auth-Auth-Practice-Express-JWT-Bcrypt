import jwt from 'jsonwebtoken';

export const authMiddleWare = (req,res,next)=>{
      const authHeader = req.headers["authorization"];
       const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success: false,
                message: "not authorized login"
            })
        }
         try {
             const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
             
             req.userInfo = decodedToken;
             next();
         } catch (error) {
            res.status(500).json({
                success:false,
                message: error.message
            })
         }
       
}