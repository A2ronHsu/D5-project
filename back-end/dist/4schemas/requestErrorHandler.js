"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseErrorHandler extends Error {
    statusCode;
    constructor(statusCode, message, options) {
        super(message, options);
        this.statusCode = statusCode | 200;
    }
}
exports.default = ResponseErrorHandler;
