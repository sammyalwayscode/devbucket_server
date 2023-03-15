import mongoose from "mongoose";

interface User {
  user: {};
}

interface iUser extends User, mongoose.Document {}

const followingSchema = new mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

const followingModel = mongoose.model<iUser>("following", followingSchema);
export default followingModel;
