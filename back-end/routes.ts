import { Request, Response, Router } from "express";
import FormController from "./controllers/formController";
import FormService from "./services/formService";
import GoogleRepository from "./repositories/googlesheetRepository";
import authClient from "./schemas/authGoogle";



const router = Router();
const formController = new FormController(new FormService(new GoogleRepository(authClient())));


router.post("/submit", async (req: Request, res: Response) => {
   await formController.submit(req, res);
});

router.get("/getCodigo", async (req: Request, res: Response) => {
   await formController.getCodigo(req, res);
})

router.get("/getAllCodigos/:id", async (req: Request, res: Response) => {
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