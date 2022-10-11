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
exports.ViewCount = void 0;
const tours_model_1 = require("../models/tours.model");
const ViewCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tour = yield tours_model_1.TourModel.findById(id);
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Tour not found",
        });
    }
    tour.view += 1;
    yield tour.save();
    next();
});
exports.ViewCount = ViewCount;
