"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    projectImage: {
        type: String,
    },
    projectTitle: {
        type: String,
    },
    projectName: {
        type: String,
    },
    projectDetails: {
        type: String,
    },
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "comments",
        },
    ],
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "likes",
        },
    ],
    views: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "views",
        },
    ],
    gitHubURI: {
        type: String,
    },
    liveURI: {
        type: String,
    },
}, { timestamps: true });
const projectModel = mongoose_1.default.model("projects", projectSchema);
exports.default = projectModel;
