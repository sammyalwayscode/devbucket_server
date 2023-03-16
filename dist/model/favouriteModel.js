"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favouriteSchema = new mongoose_1.default.Schema({
    favUserName: {
        type: String,
    },
    favProject: {
        type: {
            type: Object,
        },
    },
});
const favouriteModule = mongoose_1.default.model("favourite", favouriteSchema);
exports.default = favouriteModule;
