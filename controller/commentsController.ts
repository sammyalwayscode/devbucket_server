import { Request, Response } from "express";
import mongoose from "mongoose";
import commentModel from "../model/commentsModel";
import projectModel from "../model/projectModel";
import userModel from "../model/userModel";

export const postComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userComment } = req.body;
    const getProject = await projectModel.findById(req.params.projectID);
    const getUser = await userModel.findById(req.params.id);

    const newComment = await commentModel.create({
      userComment,
      userCommentName: getUser?.name,
      userCommentAvatar: getUser?.avatar,
    });

    getProject?.comments.push(new mongoose.Types.ObjectId(newComment._id));
    getProject?.save();

    return res.status(201).json({
      message: "Comment Uploaded",
      data: newComment,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Posting Comment",
      data: error,
    });
  }
};

export const viewComments = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allProjectComments = await projectModel
      .findById(req.params.projectID)
      .populate({
        path: "comments",
        options: { createdAt: -1 },
      });

    return res.status(200).json({
      message: "All Project Comments",
      data: allProjectComments,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Viewing Comments",
      data: error,
    });
  }
};
