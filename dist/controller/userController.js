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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserAvatar = exports.signInUser = exports.signUpUser = exports.getOneUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield userModel_1.default.find();
        return res.status(200).json({
            message: "All Users...",
            data: findUser,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get all users",
            data: error,
        });
    }
});
exports.getUsers = getUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneUser = yield userModel_1.default.findById(req.params.id);
        return res.status(200).json({
            message: "Data Found...",
            data: oneUser,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get user",
            data: error,
        });
    }
});
exports.getOneUser = getOneUser;
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        //Checking to see if User Exist Before
        //A Simple flow of if User Exist trow a message of User already Exist and if not go ahead to register user
        const olduser = yield userModel_1.default.findOne({ email });
        if (olduser) {
            return res.status(400).json({
                message: "User Already Exist",
            });
        }
        else {
            //Create A New User
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashed = yield bcrypt_1.default.hash(password, salt);
            // const userOTP = otpGenerator.generate(6, {
            //   digits: true,
            //   upperCaseAlphabets: false,
            //   lowerCaseAlphabets: false,
            //   specialChars: false,
            // });
            const jwtSecrete = "fw36r7890d7wygg3is76wh5t9oiuy";
            const tokenValue = crypto_1.default.randomBytes(23).toString("hex");
            const myToken = jsonwebtoken_1.default.sign({ tokenValue }, jwtSecrete, {
                expiresIn: "30min",
            });
            const newUser = yield userModel_1.default.create({
                name,
                email,
                password: hashed,
                verifiedToken: myToken,
                verified: false,
                // OTP: userOTP,
            });
            // await verifyModel.create({
            //   token: myToken,
            //   userID: newUser._id,
            //   _id: newUser._id,
            // });
            //Verify email here
            // signUpEmail(newUser)
            //   .then((res) => {
            //     console.log(`Mail Sent... 📧📧📧 ${res}`);
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //   });
            return res.status(201).json({
                message: "Mail Sent..., Go to your inbox to continue",
                data: newUser,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Signing Up User",
            data: error,
        });
    }
});
exports.signUpUser = signUpUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        //Writing A Condition to Know If User Exist...
        if (user) {
            //Checking if password matches with the one entered by the user
            const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
            //encrypting user's info for persistent
            const tokenData = jsonwebtoken_1.default.sign({ id: user._id }, "fw36r7890d7wygg3is76wh5t9oiuy");
            //Setting a condition... If Password id correct Itshould sign User In
            if (passwordCheck) {
                const _a = user._doc, { password } = _a, info = __rest(_a, ["password"]);
                return res.status(200).json({
                    message: "User Found",
                    data: Object.assign(Object.assign({}, info), { tokenData }),
                });
            }
            else {
                return res.status(404).json({
                    message: "Password is not Correct",
                });
            }
        }
        else {
            return res.status(400).json({ message: "User Cannot Be Found" });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Signing In User",
            data: error,
        });
    }
});
exports.signInUser = signInUser;
const updateUserAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield userModel_1.default.findById(req.params.id);
        if (currentUser) {
            if (currentUser.avatar) {
                yield cloudinary_1.default.uploader.destroy(currentUser === null || currentUser === void 0 ? void 0 : currentUser.avatarID);
                const cloudImage = yield cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
                const updateAvatar = yield userModel_1.default.findByIdAndUpdate(req.params.id, { avatar: cloudImage.secure_url, avatarID: cloudImage.public_id }, { new: true });
                return res.status(200).json({
                    message: "Avatar Updated...",
                    data: updateAvatar,
                });
            }
            else {
                const cloudImage = yield cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
                const updateAvatar = yield userModel_1.default.findByIdAndUpdate(req.params.id, { avatar: cloudImage.secure_url, avatarID: cloudImage.public_id }, { new: true });
                return res.status(200).json({
                    message: "Avatar Updated...",
                    data: updateAvatar,
                });
            }
        }
        else {
            return res.status(400).json({
                message: "Can't Preform Update",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Updating User's Avatar",
            data: error,
        });
    }
});
exports.updateUserAvatar = updateUserAvatar;
// export const removeUser = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const deleteUser = await userModel.findByIdAndDelete(req.params.userID);
//     return res.status(200).json({
//       message: "User Deleted All Sucessfully",
//       data: deleteUser,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: "An Error Occoured Deleting This User",
//       data: error,
//     });
//   }
// };
