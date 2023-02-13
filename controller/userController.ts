import userModel from "../model/userModel";
import { Request, Response } from "express";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const findUser = await userModel.find();
    return res.status(200).json({
      message: "All Users...",
      data: findUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get all users",
      data: error,
    });
  }
};

// export const signUpUser = async (req:Request, res:Response): Promise<Response> => {
//     try {
//         const {name,email,password,avatar, avatarID , verifiedToken, verified, } = req.body
//     } catch (error) {
//         return res.status(400).json({
//             message: "An Error Occoured Signing Up User",
//             data: error
//         })
//     }
// }
