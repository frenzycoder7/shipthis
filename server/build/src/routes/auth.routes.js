"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_routes = void 0;
const _logic_1 = require("@logic");
const express_1 = require("express");
const _middlewares_1 = require("@middlewares");
const _models_1 = require("@models");
exports.auth_routes = (0, express_1.Router)();
exports.auth_routes.post('/register', (0, _middlewares_1.checkrequiredBody)((0, _middlewares_1.filterKeysFromObjects)(_models_1.user_structure)), _logic_1.createUserLogic);
exports.auth_routes.post('/login', (0, _middlewares_1.checkrequiredBody)(['email', 'password']), _logic_1.loginUserLogic);
exports.auth_routes.get('/validate', (0, _middlewares_1.checkrequiredHeaders)(['authorization']), (0, _middlewares_1.authenticateUser)(false), _logic_1.validateUserLogic);
//# sourceMappingURL=auth.routes.js.map