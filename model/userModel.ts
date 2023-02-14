import mongoose from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
  projects: {}[];
  verifiedToken: string;
  verified: boolean;
  favourite: {}[];
  followers: {}[];
  following: {}[];
  OTP: string;
  mainOTP: string;
}

interface iUser extends User, mongoose.ObjectId {}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
      },
    ],
    verifiedToken: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    favourite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "favourite",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "followers",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "following",
      },
    ],
    OTP: {
      type: String,
    },
    mainOTP: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model<iUser>("users", userSchema);
export default userModel;
