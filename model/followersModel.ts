import mongoose from "mongoose";
interface User {
  user: {};
}

interface iUser extends User, mongoose.Document {}

const followersSchema = new mongoose.Schema(
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

const followersModel = mongoose.model<iUser>("followers", followersSchema);
export default followersModel;
