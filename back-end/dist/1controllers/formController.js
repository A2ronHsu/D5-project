"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FormSchemas_1 = require("../4schemas/FormSchemas");
const requestErrorHandler_1 = __importDefault(require("../4schemas/requestErrorHandler"));
class FormController {
    formService;
    constructor(formService) {
        this.formService = formService;
    }
    async submit(req, res) {
        try {
            console.log(req.body);
            const validInput = (0, FormSchemas_1.entradaPosicionesValidation)(req.body);
            const response = await this.formService.submit(validInput);
            res.json(response);
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(err.statusCode).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.json({ error: "unknown error" });
            }
        }
    }
    async postPosicionRecebimiento(req, res) {
        console.log(req.body);
        try {
            console.log(req.body);
            const validInput = (0, FormSchemas_1.entradaPosicionesRecebimientosValidation)(req.body);
            const response = await this.formService.postPosicionRecebimiento(validInput);
            res.json(response);
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(err.statusCode).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.json({ error: "unknown error" });
            }
        }
    }
    async getCodigo(req, res) {
        try {
            const validInput = (0, FormSchemas_1.getCodigoValidation)(req.body);
            const response = await this.formService.getCodigo(validInput.codigo, validInput.dep);
            res.json(response);
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(err.statusCode).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.json({ error: "unknown error" });
            }
        }
    }
    async getAllCodigos(req, res) {
        try {
            const { dep } = req.params;
            const response = await this.formService.getAllCodigos(dep);
            res.json({ allCodigos: response });
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(err.statusCode).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.json({ error: "unknown error" });
            }
        }
    }
    async getLastPosicionRecebimientos(req, res) {
        try {
            const { packingList } = req.params;
            console.log(req.params);
            const response = await this.formService.getLastPosicionRecebimientos(packingList);
            res.json({ lastPosicion: response });
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(err.statusCode).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.json({ error: "unknown error" });
            }
        }
    }
    async getRow(req, res) {
        try {
            const { codigo, dep } = req.body;
            const response = await this.formService.getRow(codigo, dep);
            res.json({ row: response });
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(err.statusCode).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.json({ error: "unknown error" });
            }
        }
    }
    async getRowRecebimientos(req, res) {
        try {
            const { codigo, packingList } = req.body;
            const response = await this.formService.getRowRecebimientos(codigo, packingList);
            res.json({ row: response });
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(err.statusCode).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.json({ error: "unknown error" });
            }
        }
    }
    async transfer(req, res) {
        try {
            console.log(req.body);
            const validInput = (0, FormSchemas_1.transferValidation)(req.body);
            const response = await this.formService.transfer(validInput);
            res.json(response);
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(err.statusCode).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.json({ error: "unknown error on e281f39d" });
            }
        }
    }
}
exports.default = FormController;
