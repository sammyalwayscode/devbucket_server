import { Request, Response } from "express";
import projectModel from "../model/projectModel";
import cloudinary from "../config/cloudinary";
import mongoose from "mongoose";
import userModel from "../model/userModel";

export const createNewProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { projectTitle, projectName, projectDetails, gitHubURI, liveURI } =
      req.body;

    const cloudImage = await cloudinary.uploader.upload(req?.file!.path);
    const getUser = await userModel.findById(req.params.userId);
    const newProject = await projectModel.create({
      projectTitle,
      projectName,
      projectDetails,
      gitHubURI,
      liveURI,
      projectImage: cloudImage.secure_url,
      projectImageID: cloudImage.public_id,
    });

    getUser?.projects.push(new mongoose.Types.ObjectId(newProject._id));
    getUser?.save();

    return res.status(201).json({
      message: "Project Created",
      data: newProject,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error occoured Creating Project",
      data: error,
    });
  }
};

export const getAllUserProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getUserModel = await userModel.findById(req.params.id).populate({
      path: "projects",
      options: { createdAt: -1 },
    });

    return res.status(200).json({
      message: "Users Project Gotten",
      data: getUserModel,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured When getting User's Project",
      data: error,
    });
  }
};

export const getOneUsersProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getOne = await projectModel.findById(req.params.projectID);
    return res.status(200).json({
      message: "Project Found",
      data: getOne,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Getting This Particular User",
      data: error,
    });
  }
};

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

export const getAllProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allProject = await projectModel.find();
    return res.status(200).json({
      message: "All Projects...",
      data: allProject,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Getting Users",
      data: error,
    });
  }
};
