import mongoose from "mongoose";
import TourSchema from "../Schema/tours.schema";

export const TourModel = mongoose.model("TourModel", TourSchema);
