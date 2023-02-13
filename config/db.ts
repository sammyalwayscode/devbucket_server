import mongoose from "mongoose";

const URI: string = "mongodb://localhost/devbucket";

mongoose.connect(URI);
mongoose.connection
  .on("open", () => {
    console.log("Connected to DataBase");
  })
  .once("error", (error) => {
    console.log("Fained to Access DB...", error);
  });
