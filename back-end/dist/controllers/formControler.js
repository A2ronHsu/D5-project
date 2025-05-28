"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormSchemas_1 = require("../schemas/FormSchemas");
class FormController {
    formService;
    constructor(formService) {
        this.formService = formService;
    }
    async submit(req, res) {
        const validIput = (0, FormSchemas_1.entradaPosicionesValidation)(req.body);
        const response = await this.formService.submit(validIput);
        res.json(response);
    }
    async getCodigo(req, res) {
        const validInput = (0, FormSchemas_1.getCodigoValidation)(req.body);
        const response = await this.formService.getCodigo(validInput);
        res.json(response);
    }
    async getAllCodigos(req, res) {
        const response = await this.formService.getAllCodigos();
        res.json({ allCodigos: response });
    }
    async getRow(req, res) {
        const { codigo } = req.body;
        const response = await this.formService.getRow(codigo);
        res.json({ row: response });
    }
}
exports.default = FormController;
