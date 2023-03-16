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
exports.viewFollowers = exports.unFollow = exports.follow = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Sending the ID user B which user A just followed into the array of user A as following
        yield userModel_1.default.findByIdAndUpdate(req.params.followingID, { $push: { following: req.params.followerID } }, { new: true });
        //Sending the ID of user A trying to follow user B into the array of user B as a follower
        yield userModel_1.default.findByIdAndUpdate(req.params.followerID, { $push: { followers: req.params.followingID } }, { new: true });
        return res.status(200).json({
            message: "Following ✅✅✅",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Following This User",
            data: error,
        });
    }
});
exports.follow = follow;
const unFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.findByIdAndUpdate(req.params.followingID, { $pull: { following: req.params.followerID } }, { new: true });
        yield userModel_1.default.findByIdAndUpdate(req.params.followerID, { $pull: { followers: req.params.followingID } }, { new: true });
        return res.status(200).json({
            message: "UnFollowed 👎👎👎",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Unfollowing This User",
            data: error,
        });
    }
});
exports.unFollow = unFollow;
const viewFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getFollow = yield userModel_1.default.findById(req.params.userID).populate({
            path: "followers",
            options: { createdAt: -1 },
        });
        return res.status(200).json({
            message: "Here Are Your Followres...",
            data: getFollow,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "An Error Occoured Viewing Followers",
            data: error,
        });
    }
});
exports.viewFollowers = viewFollowers;
