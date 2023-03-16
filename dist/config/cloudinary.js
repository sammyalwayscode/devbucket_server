"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    api_key: "871341554644239",
    cloud_name: "samolorunda",
    api_secret: "Mt_S1riHhh5g9plWHVdpiHyyv58",
    secure: true,
});
exports.default = cloudinary_1.v2;
