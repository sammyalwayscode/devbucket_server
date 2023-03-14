import { Router } from "express";
import { likeProject, unLikePost } from "../controller/likeController";
const router = Router();

router.route("/:userLikeID/:likeID/like").patch(likeProject);
router.route("/:userID/:projectID/unLike").patch(unLikePost);

export default router;
