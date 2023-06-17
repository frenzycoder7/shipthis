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
exports.getShowFilterOptions = exports.getShows = void 0;
const _models_1 = require("@models");
const getShows = (query, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query, limit, skip);
    let shows = yield _models_1.SHOW_MODEL.find(query).limit(limit).skip(skip);
    let count = yield _models_1.SHOW_MODEL.count(query);
    return { shows, count };
});
exports.getShows = getShows;
const getShowFilterOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    let shows = yield _models_1.SHOW_MODEL.aggregate([
        {
            $group: {
                _id: '$type',
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                type: '$_id',
            }
        },
        {
            $group: {
                _id: null,
                types: { $push: "$type" }
            }
        },
        {
            $project: {
                _id: 0,
                types: 1
            }
        }
    ]);
    return shows[0].types;
});
exports.getShowFilterOptions = getShowFilterOptions;
//# sourceMappingURL=show.service.js.map