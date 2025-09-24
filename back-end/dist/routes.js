"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formController_1 = __importDefault(require("./1controllers/formController"));
const formService_1 = __importDefault(require("./2services/formService"));
const googlesheetRepository_1 = __importDefault(require("./3repositories/googlesheetRepository"));
const authGoogle_1 = __importDefault(require("./4schemas/authGoogle"));
const AuthController_1 = __importDefault(require("./1controllers/AuthController"));
const AuthService_1 = __importDefault(require("./2services/AuthService"));
const AuthRepository_1 = __importDefault(require("./3repositories/AuthRepository"));
const authenticationMiddleware_1 = __importDefault(require("./5middlewares/authenticationMiddleware"));
const authorizationMiddleware_1 = __importDefault(require("./5middlewares/authorizationMiddleware"));
const OrderController_1 = __importDefault(require("./1controllers/OrderController"));
const OrderService_1 = __importDefault(require("./2services/OrderService"));
const PrismaRepository_1 = __importDefault(require("./3repositories/PrismaRepository"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const formController = new formController_1.default(new formService_1.default(new googlesheetRepository_1.default((0, authGoogle_1.default)())));
const authController = new AuthController_1.default(new AuthService_1.default(new AuthRepository_1.default()));
const orderController = new OrderController_1.default(new OrderService_1.default(new PrismaRepository_1.default(new client_1.PrismaClient())));
router.post("/submit", async (req, res) => {
    await formController.submit(req, res);
});
router.get("/getCodigo", async (req, res) => {
    await formController.getCodigo(req, res);
});
router.get("/getAllCodigos/:dep", async (req, res) => {
    await formController.getAllCodigos(req, res);
});
router.get("/getLastPosicionRecebimientos/:packingList", async (req, res) => {
    await formController.getLastPosicionRecebimientos(req, res);
});
router.post("/getRow", async (req, res) => {
    await formController.getRow(req, res);
});
router.post("/auth/register", async (req, res) => {
    await authController.register(req, res);
});
router.post("/auth/login", async (req, res) => {
    await authController.login(req, res);
});
router.post("/dannyhome/transfer/post", authenticationMiddleware_1.default, (0, authorizationMiddleware_1.default)(["depositero"]), async (req, res) => {
    await formController.transfer(req, res);
});
router.get("/auth/status", authenticationMiddleware_1.default, (0, authorizationMiddleware_1.default)(["depositero"]), (req, res) => {
    authController.status(req, res);
});
router.post("/auth/logout", (req, res) => {
    authController.logout(req, res);
});
router.post("/getRowRecebimientos", (req, res) => {
    formController.getRowRecebimientos(req, res);
});
router.post("/submitRecebimiento", (req, res) => {
    formController.postPosicionRecebimiento(req, res);
});
router.post("/listadenotas", async (req, res) => {
    console.log("post request on /listadenotas received");
    await orderController.addNotas(req, res);
});
exports.default = router;
