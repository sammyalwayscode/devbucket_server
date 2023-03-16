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
exports.unLikePost = exports.likeProject = void 0;
const projectModel_1 = __importDefault(require("../model/projectModel"));
const likeProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likePost = yield projectModel_1.default.findByIdAndUpdate(req.params.likeID, {
            $push: { likes: req.params.userLikeID },
        }, { new: true });
        // const getUser = await userModel.findById(req.params.id);
        // const newFavourite = await favouriteModule.create({
        //   favUserName: getUser?.name,
        //   favProject: getUser?.projects,
        // });
        // getUser?.favourite.push(new mongoose.Types.ObjectId(newFavourite._id));
        // getUser?.save();
        return res.status(200).json({
            message: "Project Liked 👍👍👍",
            data: likePost,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Liking The Post",
            data: error,
        });
    }
});
exports.likeProject = likeProject;
const unLikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unLikePost = yield projectModel_1.default.findByIdAndUpdate(req.params.projectID, {
            $pull: { likes: req.params.userID },
        }, { new: true });
        return res.status(400).json({
            message: "Project Unliked 👎👎👎",
            data: unLikePost,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured UnLiking The Post",
            data: error,
        });
    }
});
exports.unLikePost = unLikePost;
