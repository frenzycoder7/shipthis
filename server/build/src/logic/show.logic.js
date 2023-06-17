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
exports.fetchShowFilterLogic = exports.fetchShowsLogic = void 0;
const _services_1 = require("@services");
const fetchShowsLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, _services_1.getShows)(req.searchQuery, req.limit, req.skip);
        res.status(200).json(Object.assign(Object.assign({ message: "Shows fetched successfully" }, data), { status: "success" }));
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error, status: "error" });
    }
});
exports.fetchShowsLogic = fetchShowsLogic;
const fetchShowFilterLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let types = yield (0, _services_1.getShowFilterOptions)();
        res.status(200).json({ message: "Show filter options fetched successfully", types, status: "success" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error, status: "error" });
    }
});
exports.fetchShowFilterLogic = fetchShowFilterLogic;
//# sourceMappingURL=show.logic.js.map