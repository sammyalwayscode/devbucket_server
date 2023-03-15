import { Router } from "express";
import {
  follow,
  unFollow,
  viewFollowers,
} from "../controller/followController";

const router = Router();

router.route("/:followingID/:followerID/follow").patch(follow);
router.route("/:followingID/:followerID/unfollow").patch(unFollow);
router.route("/:userID/followers").get(viewFollowers);

export default router;
