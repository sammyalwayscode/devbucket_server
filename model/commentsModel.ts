import mongoose from "mongoose";

interface Comments {
  userCommentAvatar: string;
  userCommentName: string;
  userComment: string;
}

interface iComments extends Comments, mongoose.ObjectId {}

const commentSchema = new mongoose.Schema(
  {
    userCommentAvatar: {
      type: String,
    },
    userCommentName: {
      type: String,
    },
    userComment: {
      type: String,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model<iComments>("comments", commentSchema);

export default commentModel;
