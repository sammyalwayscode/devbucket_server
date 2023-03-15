import { Request, Response } from "express";
import userModel from "../model/userModel";
import followingModel from "../model/followingModel";
import followersModel from "../model/followersModel";
import mongoose from "mongoose";

export const follow = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //Sending the ID user B which user A just followed into the array of user A as following
    await userModel.findByIdAndUpdate(
      req.params.followingID,
      { $push: { following: req.params.followerID } },
      { new: true }
    );

    //Sending the ID of user A trying to follow user B into the array of user B as a follower
    await userModel.findByIdAndUpdate(
      req.params.followerID,
      { $push: { followers: req.params.followingID } },
      { new: true }
    );

    return res.status(200).json({
      message: "Following ✅✅✅",
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Following This User",
      data: error,
    });
  }
};

export const unFollow = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await userModel.findByIdAndUpdate(
      req.params.followingID,
      { $pull: { following: req.params.followerID } },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      req.params.followerID,
      { $pull: { followers: req.params.followingID } },
      { new: true }
    );

    return res.status(200).json({
      message: "UnFollowed 👎👎👎",
    });
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Unfollowing This User",
      data: error,
    });
  }
};

export const viewFollowers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getFollow = await userModel.findById(req.params.userID).populate({
      path: "followers",
      options: { createdAt: -1 },
    });

    return res.status(200).json({
      message: "Here Are Your Followres...",
      data: getFollow,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An Error Occoured Viewing Followers",
      data: error,
    });
  }
};
