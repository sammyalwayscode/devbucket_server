"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const followController_1 = require("../controller/followController");
const router = (0, express_1.Router)();
router.route("/:followingID/:followerID/follow").patch(followController_1.follow);
router.route("/:followingID/:followerID/unfollow").patch(followController_1.unFollow);
router.route("/:userID/followers").get(followController_1.viewFollowers);
exports.default = router;
