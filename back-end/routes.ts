import { Request, Response, Router } from "express";
import FormController from "./1controllers/formController";
import FormService from "./2services/formService";
import GoogleRepository from "./3repositories/googlesheetRepository";
import authClient from "./4schemas/authGoogle";
import AuthRegisterController from "./1controllers/AuthRegisterController";
import AuthRegisterService from "./2services/AuthRegisterService";
import AuthRepository from "./3repositories/AuthRepository";



const router = Router();
const formController = new FormController(new FormService(new GoogleRepository(authClient())));
const authRegisterController = new AuthRegisterController(new AuthRegisterService( new AuthRepository()));

router.post("/submit", formController.submit);

router.get("/getCodigo", formController.getCodigo);

router.get("/getAllCodigos/:dep", formController.getAllCodigos);

router.post("/getRow", formController.getRow)

router.post("/auth/register", authRegisterController.register);

//


/**
router.post("/", async (req: Request,res: Response)=>{
   const repository = await GoogleRepository.build();
   repository.writeData("A:M",[['1','2','3','4'],['2'],["3"],["4"]],)
   res.json({ok:"ok"})
})
**/
export default router;