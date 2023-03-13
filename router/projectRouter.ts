import { Router } from "express";
import { projectImageUpload } from "../config/multer";
import {
  createNewProject,
  getAllUserProject,
} from "../controller/projectController";

const router = Router();

router.route("/:userId/newProject").post(projectImageUpload, createNewProject);
router.route("/:id/usersProject").get(getAllUserProject);

export default router;
