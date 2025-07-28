import { Request, Response, NextFunction } from 'express';
import { Roles } from "../5models/AuthModels";

export const authorizationMiddleware = (roles: Array<Roles>) => {
   return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
         res.status(401)
            .json({ message: "Authentication required" });
         return
      }
      if (!roles.includes(req.user.role)) {
         res.status(403)
            .json({ message: 'Access denied: permission error' });
         return
      }

      next();
   }
}

export default authorizationMiddleware;