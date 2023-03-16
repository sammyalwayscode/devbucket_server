"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewComments = exports.postComment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentsModel_1 = __importDefault(require("../model/commentsModel"));
const projectModel_1 = __importDefault(require("../model/projectModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userComment } = req.body;
        const getProject = yield projectModel_1.default.findById(req.params.projectID);
        const getUser = yield userModel_1.default.findById(req.params.id);
        const newComment = yield commentsModel_1.default.create({
            userComment,
            userCommentName: getUser === null || getUser === void 0 ? void 0 : getUser.name,
            userCommentAvatar: getUser === null || getUser === void 0 ? void 0 : getUser.avatar,
        });
        getProject === null || getProject === void 0 ? void 0 : getProject.comments.push(new mongoose_1.default.Types.ObjectId(newComment._id));
        getProject === null || getProject === void 0 ? void 0 : getProject.save();
        return res.status(201).json({
            message: "Comment Uploaded",
            data: newComment,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Posting Comment",
            data: error,
        });
    }
});
exports.postComment = postComment;
const viewComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProjectComments = yield projectModel_1.default
            .findById(req.params.projectID)
            .populate({
            path: "comments",
            options: { createdAt: -1 },
        });
        return res.status(200).json({
            message: "All Project Comments",
            data: allProjectComments,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Viewing Comments",
            data: error,
        });
    }
});
exports.viewComments = viewComments;
