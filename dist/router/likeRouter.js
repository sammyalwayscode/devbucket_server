"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likeController_1 = require("../controller/likeController");
const router = (0, express_1.Router)();
router.route("/:userLikeID/:likeID/like").patch(likeController_1.likeProject);
router.route("/:userID/:projectID/unLike").patch(likeController_1.unLikePost);
exports.default = router;
