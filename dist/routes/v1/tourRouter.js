"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tours_controller_1 = require("../../controllers/tours.controller");
const viewCount_1 = require("../../middlewares/viewCount");
const router = (0, express_1.Router)();
// router.post("/", toursRouter.createTour).get("/", toursRouter.GetAllTours);
router
    .route("/tours")
    .post(tours_controller_1.toursRouter.createTour)
    .get(tours_controller_1.toursRouter.GetAllTours);
router.route("/tour/trending").get(tours_controller_1.toursRouter.getTrendingTours);
router.route("/tour/cheapest").get(tours_controller_1.toursRouter.getCheapestTours);
router.route("/tours/:id").get(viewCount_1.ViewCount, tours_controller_1.toursRouter.GetTourById);
router.route("/tour/:id").patch(tours_controller_1.toursRouter.updateTourById);
exports.default = router;
