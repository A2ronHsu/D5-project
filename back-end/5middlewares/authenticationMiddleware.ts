import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ResponseErrorHandler from "../4schemas/requestErrorHandler";
import { jwtToken, Roles } from "../5models/AuthModels";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;



const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.cookies.token;

      if (!token) {
         throw new ResponseErrorHandler(401, 'denied', 'credentials denied');
      }

      const decoded = jwt.verify(token, JWT_SECRET) as jwtToken

      req.user = {
         id: decoded.id,
         role: decoded.role as Roles
      }



      next();

   } catch (err) {
      console.error("token verification failed", err);
      if (err instanceof jwt.TokenExpiredError) {
         res.status(401).json({ message: "token expired" });
         return
      };
      if (err instanceof ResponseErrorHandler) {
         res.status(err.statusCode).json({
            name: err.name,
            message: err.message
         })
         return

      }
      if (err instanceof jwt.TokenExpiredError) {
         res.status(401).json(err);
         return

      }
      res.status(401).json({ message: "unknown token error" });
   }



}

export default authenticationMiddleware;