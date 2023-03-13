import mongoose from "mongoose";

interface Projects {
  projectImage: string;
  projectImageID: string;
  projectTitle: string;
  projectName: string;
  projectDetails: string;
  comments: {}[];
  likes: {}[];
  views: {}[];
  gitHubURI: string;
  liveURI: string;
}

interface iProjects extends Projects, mongoose.ObjectId {}

const projectSchema = new mongoose.Schema(
  {
    projectImage: {
      type: String,
    },
    projectTitle: {
      type: String,
    },
    projectName: {
      type: String,
    },
    projectDetails: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "likes",
      },
    ],
    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "views",
      },
    ],
    gitHubURI: {
      type: String,
    },
    liveURI: {
      type: String,
    },
  },
  { timestamps: true }
);

const projectModel = mongoose.model<iProjects>("projects", projectSchema);
export default projectModel;
