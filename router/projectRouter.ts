import { Router } from "express";
import { projectImageUpload } from "../config/multer";
import {
  createNewProject,
  getAllUserProject,
  //   updateProject,
} from "../controller/projectController";

const router = Router();

router.route("/:userId/newProject").post(projectImageUpload, createNewProject);
router.route("/:id/usersProject").get(getAllUserProject);
// router.route("/:updateID").patch(projectImageUpload, updateProject);

export default router;
