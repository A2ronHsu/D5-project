"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderSchema_1 = require("../4schemas/OrderSchema");
const requestErrorHandler_1 = __importDefault(require("../4schemas/requestErrorHandler"));
class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    async addNotas(req, res) {
        try {
            const validInput = (0, OrderSchema_1.OrderJsonValidation)(req.body);
            const response = await this.orderService.addNotas(validInput);
            console.log(response);
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
                res.json({ error: `unknown error: ${err}` });
            }
        }
    }
}
exports.default = OrderController;
