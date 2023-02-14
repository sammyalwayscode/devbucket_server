import mongoose from "mongoose";

interface verifyUser {
  token: string;
  userID: {};
}

interface iVerify extends verifyUser, mongoose.ObjectId {}

const verifySchema = new mongoose.Schema({
  token: {
    type: String,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const verifyModel = mongoose.model<iVerify>("verifyUser", verifySchema);
export default verifyModel;
