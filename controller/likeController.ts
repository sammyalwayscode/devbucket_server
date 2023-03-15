import { Request, Response } from "express";
import mongoose from "mongoose";
import favouriteModule from "../model/favouriteModel";
import likeModel from "../model/likeModel";
import projectModel from "../model/projectModel";
import userModel from "../model/userModel";

export const likeProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const likePost = await projectModel.findByIdAndUpdate(
      req.params.likeID,
      {
        $push: { likes: req.params.userLikeID },
      },
      { new: true }
    );

    // const getUser = await userModel.findById(req.params.id);
    // const newFavourite = await favouriteModule.create({
    //   favUserName: getUser?.name,
    //   favProject: getUser?.projects,
    // });

    // getUser?.favourite.push(new mongoose.Types.ObjectId(newFavourite._id));
    // getUser?.save();

    return res.status(200).json({
      message: "Project Liked 👍👍👍",
      data: likePost,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Liking The Post",
      data: error,
    });
  }
};

export const unLikePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const unLikePost = await projectModel.findByIdAndUpdate(
      req.params.projectID,
      {
        $pull: { likes: req.params.userID },
      },
      { new: true }
    );

    return res.status(400).json({
      message: "Project Unliked 👎👎👎",
      data: unLikePost,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured UnLiking The Post",
      data: error,
    });
  }
};
