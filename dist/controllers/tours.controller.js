"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toursRouter = void 0;
const tours_model_1 = require("../models/tours.model");
// post data
const createTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tour = new tours_model_1.TourModel(req.body);
    try {
        yield tour.save();
        res.status(201).json({
            status: "Successfully created tour data",
            data: {
                tour,
            },
        });
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
});
const GetAllTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let filters = Object.assign({}, req.query);
    // operators
    let queryStr = JSON.stringify(filters);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));
    filters = JSON.parse(queryStr);
    // exclude the page and limit from the query
    const excludedFields = ["page", "limit", "sort"];
    excludedFields.forEach((field) => delete filters[field]);
    // build the query
    let queries = {};
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
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    queries.skip = skip;
    queries.limit = limitNumber;
    // console.log(queries);
    try {
        const tours = yield tours_model_1.TourModel.find(Object.assign({}, filters))
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
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
});
const GetTourById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield tours_model_1.TourModel.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                tour,
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
});
const updateTourById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield tours_model_1.TourModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                tour,
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
});
const getTrendingTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tours = yield tours_model_1.TourModel.find().sort({ view: -1 }).limit(3);
        res.status(200).json({
            status: "success",
            message: "Trending tours",
            results: tours.length,
            data: {
                tours,
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
});
const getCheapestTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tours = yield tours_model_1.TourModel.find().sort({ price: 1 }).limit(3);
        res.status(200).json({
            status: "success",
            message: "Cheapest tours",
            results: tours.length,
            data: {
                tours,
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
});
exports.toursRouter = {
    createTour,
    GetAllTours,
    GetTourById,
    updateTourById,
    getTrendingTours,
    getCheapestTours,
};
