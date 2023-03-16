"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URI = "mongodb://localhost/devbucket";
const liveURI = "mongodb+srv://W8PypVqIRJXDReMh:W8PypVqIRJXDReMh@cluster0.1nq2x.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connect(liveURI);
mongoose_1.default.connection
    .on("open", () => {
    console.log("Connected to DataBase");
})
    .once("error", (error) => {
    console.log("Fained to Access DB...", error);
});
