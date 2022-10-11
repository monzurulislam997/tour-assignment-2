"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tours_schema_1 = __importDefault(require("../Schema/tours.schema"));
exports.TourModel = mongoose_1.default.model("TourModel", tours_schema_1.default);
