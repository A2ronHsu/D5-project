"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formControler_1 = __importDefault(require("./controllers/formControler"));
const formService_1 = __importDefault(require("./services/formService"));
const googlesheetRepository_1 = __importDefault(require("./repositories/googlesheetRepository"));
const authGoogle_1 = __importDefault(require("./schemas/authGoogle"));
const router = (0, express_1.Router)();
const formController = new formControler_1.default(new formService_1.default(new googlesheetRepository_1.default((0, authGoogle_1.default)())));
router.post("/submit", async (req, res) => {
    await formController.submit(req, res);
});
router.get("/getCodigo", async (req, res) => {
    await formController.getCodigo(req, res);
});
router.get("/getAllCodigos", async (req, res) => {
    await formController.getAllCodigos(req, res);
});
router.post("/getRow", async (req, res) => {
    await formController.getRow(req, res);
});
/**
router.post("/", async (req: Request,res: Response)=>{
   const repository = await GoogleRepository.build();
   repository.writeData("A:M",[['1','2','3','4'],['2'],["3"],["4"]],)
   res.json({ok:"ok"})
})
**/
exports.default = router;
