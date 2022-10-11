"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tours_controller_1 = require("../../controllers/tours.controller");
const router = (0, express_1.Router)();
// @route  post api/v1/tours
router.route("/").post(tours_controller_1.toursRouter.createTour);
exports.default = router;
