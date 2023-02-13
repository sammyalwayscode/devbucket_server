import express, { Application, Request, Response } from "express";
const PORT: number = 2001;
const app: Application = express();
require("./config/db");

app.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json({ message: "Server Up 🚀🚀🚀" });
});

app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
