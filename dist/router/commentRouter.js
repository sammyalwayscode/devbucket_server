"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentsController_1 = require("../controller/commentsController");
const router = (0, express_1.Router)();
router.route("/:id/:projectID/comments").post(commentsController_1.postComment);
router.route("/:id/:projectID/projectComments").get(commentsController_1.viewComments);
exports.default = router;
