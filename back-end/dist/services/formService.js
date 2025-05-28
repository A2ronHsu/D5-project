"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async submit(input) {
        const { codigo, pasillo, bloco, secuencia } = input;
        const data = await this.repository.appendPosicion(codigo, [pasillo, bloco, secuencia, "", ""]);
        return data;
    }
    async getCodigo(codigo) {
        const codigoColumns = this.repository.filterCodigoIndex("ZP3035C");
        return codigoColumns;
    }
    async getAllCodigos() {
        const allCodigos = await this.repository.getAllCodigos();
        return allCodigos;
    }
    async getRow(codigo) {
        const row = await this.repository.getRow(codigo);
        return row;
    }
}
exports.default = FormService;
