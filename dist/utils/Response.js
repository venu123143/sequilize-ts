"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RESPONSE = {
    SuccessResponse: (res, status, data) => {
        return res.status(status).json(data);
    },
    FailureResponse: (res, status, data) => {
        return res.status(status).json(data);
    },
};
exports.default = RESPONSE;
