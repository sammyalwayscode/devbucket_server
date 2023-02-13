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
}

interface iUser extends User, mongoose.ObjectId {}

const userSchema = new mongoose.Schema({
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
});

const userModel = mongoose.model<iUser>("projects", userSchema);
export default userModel;
