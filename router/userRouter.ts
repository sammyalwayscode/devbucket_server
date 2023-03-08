import { Router } from "express";
import { getOneUser, getUsers, signUpUser } from "../controller/userController";

const router = Router();

router.route("/signUpUser").post(signUpUser);
router.route("/getaUser/:id").get(getOneUser);
router.route("/getAllUser").get(getUsers);

export default router;
