"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    userCommentAvatar: {
        type: String,
    },
    userCommentName: {
        type: String,
    },
    userComment: {
        type: String,
    },
}, { timestamps: true });
const commentModel = mongoose_1.default.model("comments", commentSchema);
exports.default = commentModel;
