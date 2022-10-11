import { Router } from "express";
import { toursRouter } from "../../controllers/tours.controller";

const router: Router = Router();

// @route  post api/v1/tours
router.route("/").post(toursRouter.createTour);

export default router;
