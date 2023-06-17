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
exports.validateUserLogic = exports.loginUserLogic = exports.createUserLogic = void 0;
const _connection_1 = require("@connection");
const _services_1 = require("@services");
const _utils_1 = require("@utils");
const createUserLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        body.password = yield (0, _utils_1.hashPassword)(body.password);
        let user = yield (0, _services_1.createUser)(body);
        res.status(201).json({ message: "User created successfully", user, status: "success" });
    }
    catch (error) {
        res.status(500).json({ message: error.message, error, status: "error" });
    }
});
exports.createUserLogic = createUserLogic;
const loginUserLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield (0, _services_1.getUser)({ $or: [{ email: req.body.email }, { phone: req.body.email }] }, 1, 0);
        if (user.length == 0)
            throw new Error('User not found with this email or phone');
        let isMatch = yield (0, _utils_1.comparePassword)(req.body.password, user[0].password);
        if (!isMatch)
            throw new Error('Password is incorrect');
        yield _connection_1.redisClient.del(user[0].token);
        let tokenBody = {
            _id: user[0]._id,
            email: user[0].email,
            age: user[0].age,
            name: user[0].name,
        };
        let token = yield (0, _utils_1.generateToken)(tokenBody);
        user = (yield (0, _services_1.updateUser)({ _id: user[0]._id }, { token }));
        res.status(200).json({ message: "User logged in successfully", user, token });
    }
    catch (error) {
        res.status(500).json({ message: error.message, status: "error" });
    }
});
exports.loginUserLogic = loginUserLogic;
const validateUserLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "token is valid", user: req.user, status: "success" });
});
exports.validateUserLogic = validateUserLogic;
//# sourceMappingURL=auth.logic.js.map