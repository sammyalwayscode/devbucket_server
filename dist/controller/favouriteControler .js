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
exports.createFavourite = void 0;
const favouriteModel_1 = __importDefault(require("../model/favouriteModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createFavourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUser = yield userModel_1.default.findById(req.params.id);
        const newFavourite = yield favouriteModel_1.default.create({
            favUserName: getUser === null || getUser === void 0 ? void 0 : getUser.name,
            favProject: getUser === null || getUser === void 0 ? void 0 : getUser.projects,
        });
        getUser === null || getUser === void 0 ? void 0 : getUser.favourite.push(new mongoose_1.default.Types.ObjectId(newFavourite._id));
        getUser === null || getUser === void 0 ? void 0 : getUser.save();
        return res.status(201).json({});
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Creating Favourite",
            data: error,
        });
    }
});
exports.createFavourite = createFavourite;
