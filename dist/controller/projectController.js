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
exports.getOneUsersProject = exports.getAllUserProject = exports.createNewProject = void 0;
const projectModel_1 = __importDefault(require("../model/projectModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../model/userModel"));
const createNewProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectTitle, projectName, projectDetails, gitHubURI, liveURI } = req.body;
        const cloudImage = yield cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
        const getUser = yield userModel_1.default.findById(req.params.userId);
        const newProject = yield projectModel_1.default.create({
            projectTitle,
            projectName,
            projectDetails,
            gitHubURI,
            liveURI,
            projectImage: cloudImage.secure_url,
            projectImageID: cloudImage.public_id,
        });
        getUser === null || getUser === void 0 ? void 0 : getUser.projects.push(new mongoose_1.default.Types.ObjectId(newProject._id));
        getUser === null || getUser === void 0 ? void 0 : getUser.save();
        return res.status(201).json({
            message: "Project Created",
            data: newProject,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error occoured Creating Project",
            data: error,
        });
    }
});
exports.createNewProject = createNewProject;
const getAllUserProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUserModel = yield userModel_1.default.findById(req.params.id).populate({
            path: "projects",
            options: { createdAt: -1 },
        });
        return res.status(200).json({
            message: "Users Project Gotten",
            data: getUserModel,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured When getting User's Project",
            data: error,
        });
    }
});
exports.getAllUserProject = getAllUserProject;
const getOneUsersProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOne = yield projectModel_1.default.findById(req.params.projectID);
        return res.status(200).json({
            message: "Project Found",
            data: getOne,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "An Error Occoured Getting This Particular User",
            data: error,
        });
    }
});
exports.getOneUsersProject = getOneUsersProject;
// export const updateProject = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { projectTitle, projectName, projectDetails, gitHubURI, liveURI } =
//       req.body;
//     const check = await projectModel.findById(req.params.id);
//     const cloudImage = await cloudinary.uploader.upload(req?.file!.path);
//     if (check) {
//       await cloudinary.uploader.destroy(check.projectImageID);
//       const updateProject = await projectModel.findByIdAndUpdate(
//         req.params.updateID,
//         {
//           projectTitle,
//           projectName,
//           projectDetails,
//           gitHubURI,
//           liveURI,
//           projectImage: cloudImage.secure_url,
//           projectImageID: cloudImage.public_id,
//         },
//         { new: true }
//       );
//       return res.status(201).json({
//         message: "Project Updated",
//         data: updateProject,
//       });
//     } else {
//       return res.status(400).json({
//         message: "Can't Perform Update",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       message: "An Error Occoured Updating The Data",
//       data: error,
//     });
//   }
// };
// export const deleteProject =async (req:Request, res: Response):Promise<Response> => {
//     try {
//       const getUser = await userModel.findById(req.params.userID)
//       const removeProject = await projectModel.findByIdAndRemove(req.params.projectID)
//       getUser!.projects.pull(removeProject)
//       getUser?.save()
//       return res.status(200).json({
//         message: "Project Delected ❌❌❌"
//       })
//     } catch (error) {
//         return res.status(400).json({
//             message: "An Error Occoured Deleting Project",
//             data: error
//         })
//     }
// }
