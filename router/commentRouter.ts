import { Router } from "express";
import { postComment, viewComments } from "../controller/commentsController";

const router = Router();

router.route("/:id/:projectID/comments").post(postComment);
router.route("/comments/:projectID/projectComments").get(viewComments);

export default router;
