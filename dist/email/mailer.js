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
exports.signUpEmail = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const GOOGLE_SECRET = "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";
const GOOGLE_ID = "53331541547-6851dega433ilmksfoabg8avn12bklpq.apps.googleusercontent.com";
const GOOGLE_REFERSHTOKEN = "1//04lHVuaBB2H_1CgYIARAAGAQSNwF-L9IrOOkUS2GBtouuMxjdYZnFOpm5bI4BHqZl6Lsx_w_vdVwgMqEue-wQ3cS5ib8YpN_k2J0";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_SECRET, GOOGLE_REDIRECT, GOOGLE_ID);
oAuth.setCredentials({ refresh_token: GOOGLE_REFERSHTOKEN });
const signUpEmail = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const mailTransporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "olorundasamuel2@gmail.com",
                refreshToken: accessToken.token || "",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: GOOGLE_REFERSHTOKEN,
            },
        });
        const buildFile = path_1.default.join(__dirname, "../views/mail.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {});
        const mailOption = {
            from: "Verify your DevBucket Account 🧑‍💻🧑‍💻🧑‍💻 <olorundasamuel2@gmail.com>",
            to: newUser.email,
            subject: "Account Verification",
            html: data,
        };
        mailTransporter.sendMail(mailOption);
    }
    catch (error) {
        return error;
    }
});
exports.signUpEmail = signUpEmail;
