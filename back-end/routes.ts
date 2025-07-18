import { Request, Response, Router } from "express";
import FormController from "./1controllers/formController";
import FormService from "./2services/formService";
import GoogleRepository from "./3repositories/googlesheetRepository";
import authClient from "./4schemas/authGoogle";



const router = Router();
const formController = new FormController(new FormService(new GoogleRepository(authClient())));


router.post("/submit", async (req: Request, res: Response) => {
   await formController.submit(req, res);
});

router.get("/getCodigo", async (req: Request, res: Response) => {
   await formController.getCodigo(req, res);
})

router.get("/getAllCodigos/:dep", async (req: Request, res: Response) => {
   await formController.getAllCodigos(req, res);
})

router.post("/getRow", async (req: Request, res: Response) => {
   await formController.getRow(req, res);
})

/**
router.post("/", async (req: Request,res: Response)=>{
   const repository = await GoogleRepository.build();
   repository.writeData("A:M",[['1','2','3','4'],['2'],["3"],["4"]],)
   res.json({ok:"ok"})
})
**/
export default router;