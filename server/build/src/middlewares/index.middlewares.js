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
exports.checkrequiredQuery = exports.shearchQuery = exports.authenticateUser = exports.checkrequiredHeaders = exports.filterKeysFromObjects = exports.checkrequiredBody = void 0;
const _connection_1 = require("@connection");
const _services_1 = require("@services");
const _utils_1 = require("@utils");
const checkrequiredBody = (keys) => {
    return (req, res, next) => {
        let errorKeys = [];
        try {
            keys.forEach((e) => {
                if (req.body[e] == undefined) {
                    errorKeys.push(e);
                }
            });
            if (errorKeys.length > 0)
                throw Error(`Required body keys are missing: ${errorKeys.join(', ')}`);
            else
                next();
        }
        catch (error) {
            res.status(400).json({ message: error.message, status: 'error' });
        }
    };
};
exports.checkrequiredBody = checkrequiredBody;
const filterKeysFromObjects = (object) => {
    let keys = [];
    for (const key in object) {
        if (object[key].required)
            keys.push(key);
    }
    return keys;
};
exports.filterKeysFromObjects = filterKeysFromObjects;
const checkrequiredHeaders = (keys) => {
    return (req, res, next) => {
        let errorKeys = [];
        try {
            keys.forEach((e) => {
                if (req.headers[e] == undefined) {
                    errorKeys.push(e);
                }
            });
            if (errorKeys.length > 0)
                throw Error(`Required header keys are missing: ${errorKeys.join(', ')}`);
            else
                next();
        }
        catch (error) {
            res.status(400).json({ message: error.message, status: 'error' });
        }
    };
};
exports.checkrequiredHeaders = checkrequiredHeaders;
const authenticateUser = (refreshRedis = false) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let token = req.headers.authorization;
            if (token == undefined)
                throw Error('Token is missing in headers');
            let decoded = yield (0, _utils_1.verifyToken)(token);
            if (decoded == undefined)
                throw Error('Invalid token');
            let user = yield _connection_1.redisClient.get(token);
            if (user != null) {
                req.user = JSON.parse(user);
            }
            else {
                let users = yield (0, _services_1.getUser)({ _id: decoded._id, token: token }, 1, 0);
                if (users.length == 0)
                    throw Error('User not found with this token');
                yield _connection_1.redisClient.set(token, JSON.stringify(users[0]), 'EX', 60 * 5);
                req.user = users[0];
            }
            if (refreshRedis)
                yield _connection_1.redisClient.del(token);
            next();
        }
        catch (error) {
            res.status(400).json({ message: error.message, status: 'error' });
        }
    });
};
exports.authenticateUser = authenticateUser;
const shearchQuery = () => {
    return (req, res, next) => {
        try {
            let search = '';
            if (req.query.search != undefined)
                search = req.query.search.toString();
            let searchQuery = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { cast: { $regex: search, $options: 'i' } },
                ]
            };
            req.limit = 15;
            req.skip = 0;
            if (req.query.limit != undefined)
                req.limit = parseInt(req.query.limit.toString());
            if (req.query.skip != undefined)
                req.skip = parseInt(req.query.skip.toString());
            if (req.query.filter != undefined) {
                searchQuery.type = req.query.filter.toString();
            }
            req.searchQuery = searchQuery;
            next();
        }
        catch (error) {
            res.status(400).json({ message: error.message, status: 'error' });
        }
    };
};
exports.shearchQuery = shearchQuery;
const checkrequiredQuery = (keys) => {
    return (req, res, next) => {
        let errorKeys = [];
        try {
            keys.forEach((e) => {
                if (req.query[e] == undefined) {
                    errorKeys.push(e);
                }
            });
            if (errorKeys.length > 0)
                throw Error(`Required query keys are missing: ${errorKeys.join(', ')}`);
            else
                next();
        }
        catch (error) {
            res.status(400).json({ message: error.message, status: 'error' });
        }
    };
};
exports.checkrequiredQuery = checkrequiredQuery;
//# sourceMappingURL=index.middlewares.js.map