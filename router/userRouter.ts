import { Router } from "express";
import { signUpUser } from "../controller/userController";

const router = Router();

router.route("/signUpUser").post(signUpUser);

export default router;
