import mongoose from "mongoose";

const URI: string = "mongodb://localhost/devbucket";
const liveURI: string =
  "mongodb+srv://W8PypVqIRJXDReMh:W8PypVqIRJXDReMh@cluster0.1nq2x.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(liveURI);
mongoose.connection
  .on("open", () => {
    console.log("Connected to DataBase");
  })
  .once("error", (error) => {
    console.log("Fained to Access DB...", error);
  });
