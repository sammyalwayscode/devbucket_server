"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const followersSchema = new mongoose_1.default.Schema({
    user: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
}, { timestamps: true });
const followersModel = mongoose_1.default.model("followers", followersSchema);
exports.default = followersModel;