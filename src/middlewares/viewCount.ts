import { NextFunction, Request, Response } from "express";
import { TourModel } from "../models/tours.model";
export const ViewCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const tour = await TourModel.findById(id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
  tour.view += 1;
  await tour.save();
  next();
};
