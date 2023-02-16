import userModel from "../model/userModel";
import verifyModel from "../model/verifyUser";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { signUpEmail } from "../email/email";

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
      const userOTP = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const jwtScrete = "fw36r7890d7wygg3is76w";
      const tokenValue = crypto.randomBytes(23).toString("hex");
      const myToken = jwt.sign({ tokenValue }, jwtScrete, {
        expiresIn: "30min",
      });

      const newUser = await userModel.create({
        name,
        email,
        password: hashed,
        verifiedToken: myToken,
        verified: false,
        OTP: userOTP,
      });

      await verifyModel.create({
        token: myToken,
        userID: newUser._id,
        _id: newUser._id,
      });

      //Verify email here
      signUpEmail(newUser)
        .then((res) => {
          console.log("Mail Sent 📧📧📧", res);
        })
        .catch((error) => {
          console.log(error);
        });

      return res.status(201).json({
        message: "Mail Sent..., Go to your inbox to continue",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "An Error Occoured Signing Up User",
      data: error,
    });
  }
};
