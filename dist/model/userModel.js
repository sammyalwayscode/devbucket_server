"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowerCase: true,
        trim: true,
        required: [true, "Please Enter Your Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    projects: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "projects",
        },
    ],
    verifiedToken: {
        type: String,
    },
    verified: {
        type: Boolean,
    },
    favourite: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "favourite",
        },
    ],
    followers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "followers",
        },
    ],
    following: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "following",
        },
    ],
    OTP: {
        type: String,
    },
    mainOTP: {
        type: String,
    },
}, { timestamps: true });
const userModel = mongoose_1.default.model("users", userSchema);
exports.default = userModel;
