import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./router/userRouter";
const PORT: number = 2001;
const app: Application = express();
require("./config/db");

app.use(cors({ origin: "*" }));
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json({ message: "Server Up 🚀🚀🚀" });
});

app.get("/viewEmail", (req: Request, res: Response) => {
  return res.render("mail");
});

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});

// <%= name %>
