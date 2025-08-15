import { Request, Response, NextFunction } from 'express';
import { Roles } from "../5models/AuthModels";

export const authorizationMiddleware = (roles: Array<Roles>) => {
   return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
         console.log("authorization error: no authentication");
         res.status(401)
            .json({ message: "error a1f06d5e" });
         return
      }
      if (!roles.includes(req.user.role)) {
      console.error("authorization error: role error");
         res.status(403)
            .json({ message: 'error f66bca45fea5' });
         return
      }

      next();
   }
}

export default authorizationMiddleware;