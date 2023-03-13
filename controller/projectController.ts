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
