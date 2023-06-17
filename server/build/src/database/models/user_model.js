"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_MODEL = exports.user_structure = void 0;
const mongoose_1 = require("mongoose");
const _modelnames_1 = require("@modelnames");
exports.user_structure = {
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (email) => {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            },
            message: (props) => `${props.value} is not a valid email address!`
        },
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
};
const userSchema = new mongoose_1.Schema(exports.user_structure, { timestamps: true });
exports.USER_MODEL = (0, mongoose_1.model)(_modelnames_1.USER_MODEL_NAME, userSchema);
//# sourceMappingURL=user_model.js.map