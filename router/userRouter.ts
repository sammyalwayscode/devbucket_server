import { Router } from "express";
import {
  getOneUser,
  getUsers,
  signInUser,
  signUpUser,
  updateUserAvatar,
} from "../controller/userController";
import { avatarUpload } from "../config/multer";

const router = Router();

router.route("/signUpUser").post(signUpUser);
router.route("/getaUser/:id").get(getOneUser);
router.route("/getAllUser").get(getUsers);
router.route("/signInUser").post(signInUser);
router.route("/updateAvatar/:id").patch(avatarUpload, updateUserAvatar);

export default router;
