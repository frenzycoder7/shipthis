"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOW_MODEL = exports.show_structure = void 0;
const _modelnames_1 = require("@modelnames");
const mongoose_1 = require("mongoose");
exports.show_structure = {
    show_id: {
        type: String,
    },
    cast: {
        type: String,
    },
    country: {
        type: String,
    },
    date_added: {
        type: String,
    },
    description: {
        type: String,
    },
    director: {
        type: String,
    },
    duration: {
        type: String,
    },
    listed_in: {
        type: String,
    },
    rating: {
        type: String,
    },
    release_year: {
        type: String,
    },
    title: {
        type: String,
    },
    type: {
        type: String,
    },
};
const showSchema = new mongoose_1.Schema(exports.show_structure, {
    timestamps: true,
});
exports.SHOW_MODEL = (0, mongoose_1.model)(_modelnames_1.SHOW_MODEL_NAME, showSchema);
//# sourceMappingURL=show_model.js.map