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
exports.updateUser = exports.getUser = exports.createUser = void 0;
const _models_1 = require("@models");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield _models_1.USER_MODEL.create(data);
    return user;
});
exports.createUser = createUser;
const getUser = (query, limit = 10, skip = 0) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield _models_1.USER_MODEL.find(query).limit(limit).skip(skip);
    return users;
});
exports.getUser = getUser;
const updateUser = (query, data) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield _models_1.USER_MODEL.findOneAndUpdate(query, data, { new: true });
    return user;
});
exports.updateUser = updateUser;
//# sourceMappingURL=auth.service.js.map