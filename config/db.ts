import mongoose from "mongoose";

const URI: string = "mongodb://127.0.0.1:27017/devbucket";
const liveURI: string =
  "mongodb+srv://W8PypVqIRJXDReMh:W8PypVqIRJXDReMh@cluster0.1nq2x.mongodb.net/devbucket?retryWrites=true&w=majority";

mongoose.connect(URI);
mongoose.connection
  .on("open", () => {
    console.log("Connected to DataBase");
  })
  .once("error", (error) => {
    console.log("Failed to Access DB...", error);
  });
