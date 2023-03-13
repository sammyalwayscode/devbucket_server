import userModel from "../model/userModel";
import verifyModel from "../model/verifyUser";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { signUpEmail } from "../email/mailer";
import cloudinary from "../config/cloudinary";

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

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const oneUser = await userModel.findById(req.params.id);
    return res.status(200).json({
      message: "Data Found...",
      data: oneUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get user",
      data: error,
    });
  }
};

export const signUpUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    //Checking to see if User Exist Before
    //A Simple flow of if User Exist trow a message of User already Exist and if not go ahead to register user
    const olduser = await userModel.findOne({ email });
    if (olduser) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    } else {
      //Create A New User
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      // const userOTP = otpGenerator.generate(6, {
      //   digits: true,
      //   upperCaseAlphabets: false,
      //   lowerCaseAlphabets: false,
      //   specialChars: false,
      // });
      const jwtSecrete = "fw36r7890d7wygg3is76wh5t9oiuy";
      const tokenValue = crypto.randomBytes(23).toString("hex");
      const myToken = jwt.sign({ tokenValue }, jwtSecrete, {
        expiresIn: "30min",
      });

      const newUser = await userModel.create({
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
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Signing Up User",
      data: error,
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    //Writing A Condition to Know If User Exist...
    if (user) {
      //Checking if password matches with the one entered by the user
      const passwordCheck = await bcrypt.compare(password, user.password);
      //encrypting user's info for persistent
      const tokenData = jwt.sign(
        { id: user._id },
        "fw36r7890d7wygg3is76wh5t9oiuy"
      );
      //Setting a condition... If Password id correct Itshould sign User In
      if (passwordCheck) {
        const { password, ...info } = user._doc;
        return res.status(200).json({
          message: "User Found",
          data: {
            ...info,
            tokenData,
          },
        });
      } else {
        return res.status(404).json({
          message: "Password is not Correct",
        });
      }
    } else {
      return res.status(400).json({ message: "User Cannot Be Found" });
    }
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Signing In User",
      data: error,
    });
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const currentUser = await userModel.findById(req.params.id);
    if (currentUser) {
      await cloudinary.uploader.destroy(currentUser?.avatarID!);
      const cloudImage = await cloudinary.uploader.upload(req?.file!.path);

      const updateAvatar = await userModel.findByIdAndUpdate(
        req.params.id,
        { avatar: cloudImage.secure_url, avatarID: cloudImage.public_id },
        { new: true }
      );

      return res.status(200).json({
        message: "Avatar Updated...",
        data: updateAvatar,
      });
    } else {
      return res.status(400).json({
        message: "Can't Preform Update",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Updating User's Avatar",
      data: error,
    });
  }
};
