import mongoose from "mongoose";

interface user {
  user: {};
}

interface iUser extends user, mongoose.Document {}

const likeSchema = new mongoose.Schema(
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

const likeModel = mongoose.model<iUser>("likes", likeSchema);
export default likeModel;
