import { Request, Response } from "express";
import favouriteModule from "../model/favouriteModel";
import userModel from "../model/userModel";
import mongoose from "mongoose";

export const createFavourite = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getUser = await userModel.findById(req.params.id);
    const newFavourite = await favouriteModule.create({
      favUserName: getUser?.name,
      favProject: getUser?.projects,
    });

    getUser?.favourite.push(new mongoose.Types.ObjectId(newFavourite._id));
    getUser?.save();

    return res.status(201).json({});
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Creating Favourite",
      data: error,
    });
  }
};
