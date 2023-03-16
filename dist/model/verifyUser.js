"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const verifySchema = new mongoose_1.default.Schema({
    token: {
        type: String,
    },
    userID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
});
const verifyModel = mongoose_1.default.model("verifyUser", verifySchema);
exports.default = verifyModel;
