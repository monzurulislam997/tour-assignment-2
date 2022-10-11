import { Request, Response } from "express";
import { TourModel } from "../models/tours.model";

interface queries {
  sortBy?: string;
  limit?: number;
  page?: number;
  fields?: string;
  skip?: number;
}

// post data
const createTour = async (req: Request, res: Response) => {
  const tour = new TourModel(req.body);
  try {
    await tour.save();
    res.status(201).json({
      status: "Successfully created tour data",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const GetAllTours = async (req: Request, res: Response) => {
  let filters = { ...req.query };
  // operators
  let queryStr = JSON.stringify(filters);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  // console.log(JSON.parse(queryStr));
  filters = JSON.parse(queryStr);
  // exclude the page and limit from the query
  const excludedFields = ["page", "limit", "sort"];
  excludedFields.forEach((field) => delete filters[field]);
  // build the query
  let queries: queries = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.toString().split(",").join(" ");
    queries.sortBy = sortBy;
  }
  // console.log(queries.sortBy);
  if (req.query.fields) {
    const fields = req.query.fields.toString().split(",").join(" ");
    queries.fields = fields;
  }
  // pagination logic
  const { page, limit } = req.query;
  const pageNumber = parseInt(page as string, 10) || 1;
  const limitNumber = parseInt(limit as string, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  queries.skip = skip;
  queries.limit = limitNumber;
  // console.log(queries);

  try {
    const tours = await TourModel.find({ ...filters })
      .skip(queries.skip)
      .limit(queries.limit)
      .sort(queries.sortBy)
      .select(queries.fields);
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const GetTourById = async (req: Request, res: Response) => {
  try {
    const tour = await TourModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const updateTourById = async (req: Request, res: Response) => {
  try {
    const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getTrendingTours = async (req: Request, res: Response) => {
  try {
    const tours = await TourModel.find().sort({ view: -1 }).limit(3);
    res.status(200).json({
      status: "success",
      message: "Trending tours",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getCheapestTours = async (req: Request, res: Response) => {
  try {
    const tours = await TourModel.find().sort({ price: 1 }).limit(3);
    res.status(200).json({
      status: "success",
      message: "Cheapest tours",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

export const toursRouter = {
  createTour,
  GetAllTours,
  GetTourById,
  updateTourById,
  getTrendingTours,
  getCheapestTours,
};
