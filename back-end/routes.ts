import { Request, Response, Router } from "express";
import FormController from "./1controllers/formController";
import FormService from "./2services/formService";
import GoogleRepository from "./3repositories/googlesheetRepository";
import authClient from "./4schemas/authGoogle";

import AuthController from "./1controllers/AuthController";
import AuthService from "./2services/AuthService";
import AuthRepository from "./3repositories/AuthRepository";
import authenticationMiddleware from "./5middlewares/authenticationMiddleware";
import authorizationMiddleware from "./5middlewares/authorizationMiddleware";
import { Roles } from "./5models/AuthModels";
import TransferController from "./1controllers/TransferControler";




const router = Router();
const formController = new FormController(new FormService(new GoogleRepository(authClient())));
const authController = new AuthController(new AuthService(new AuthRepository()));
const transferController = new TransferController();

declare global {
   namespace Express {
      interface Request {
         user?: {
            id: string,
            role: Roles
         }
      }
   }
}



router.post("/submit", async (req: Request, res: Response) => {
   await formController.submit(req, res);
});

router.get("/getCodigo", async (req: Request, res: Response) => {
   await formController.getCodigo(req, res);
});

router.get("/getAllCodigos/:dep", async (req: Request, res: Response) => {
   await formController.getAllCodigos(req, res);
});

router.post("/getRow", async (req: Request, res: Response) => {
   await formController.getRow(req, res);
});

router.post("/auth/register", async (req: Request, res: Response) => {
   await authController.register(req, res);
});

router.post("/auth/login", async (req: Request, res: Response) => {
   await authController.login(req, res);
})


router.post("/danyhome/transfer", authenticationMiddleware, authorizationMiddleware(["depositero"]), async (req: Request, res: Response) => {
   await transferController.post(req, res);
})

//


/**
router.post("/", async (req: Request,res: Response)=>{
   const repository = await GoogleRepository.build();
   repository.writeData("A:M",[['1','2','3','4'],['2'],["3"],["4"]],)
   res.json({ok:"ok"})
})
**/
export default router;