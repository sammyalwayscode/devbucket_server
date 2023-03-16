"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const projectRouter_1 = __importDefault(require("./router/projectRouter"));
const likeRouter_1 = __importDefault(require("./router/likeRouter"));
const commentRouter_1 = __importDefault(require("./router/commentRouter"));
const followRouter_1 = __importDefault(require("./router/followRouter"));
const PORT = 2001;
const app = (0, express_1.default)();
require("./config/db");
app.use((0, cors_1.default)({ origin: "*" }));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Server Up 🚀🚀🚀" });
});
app.get("/viewEmail", (req, res) => {
    return res.render("mail");
});
app.use("/api", userRouter_1.default);
app.use("/api", projectRouter_1.default);
app.use("/api", likeRouter_1.default);
app.use("/api", commentRouter_1.default);
app.use("/api", followRouter_1.default);
app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
});
// <%= name %>
