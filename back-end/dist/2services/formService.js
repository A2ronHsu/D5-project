"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async submit(input) {
        const { codigo, pasillo, bloco, secuencia, dep } = input;
        const data = await this.repository.appendPosicion(codigo, [pasillo, bloco, secuencia, "", ""], dep); //this two empty cells are required for furture usage on the main sheet.
        return data;
    }
    async getCodigo(codigo, dep) {
        const codigoRowNumber = await this.repository.findCodigoIndex(codigo, dep);
        return codigoRowNumber;
    }
    ;
    async getAllCodigos(dep) {
        const allCodigos = await this.repository.getAllCodigos(dep);
        return allCodigos;
    }
    async getRow(codigo, dep) {
        const row = await this.repository.getRow(codigo, dep);
        return row;
    }
    async transfer(input) {
        const { fecha, dep, codigo, bloco, cantidad } = input;
        const response = await this.repository.transfer([fecha, dep, codigo, bloco, cantidad]);
        return response;
    }
}
exports.default = FormService;
