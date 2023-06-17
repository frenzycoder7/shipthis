"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show_routes = void 0;
const _logic_1 = require("@logic");
const _middlewares_1 = require("@middlewares");
const express_1 = require("express");
exports.show_routes = (0, express_1.Router)();
exports.show_routes.get('/', (0, _middlewares_1.checkrequiredHeaders)(['authorization']), (0, _middlewares_1.authenticateUser)(false), (0, _middlewares_1.checkrequiredQuery)(['limit', 'skip']), (0, _middlewares_1.shearchQuery)(), _logic_1.fetchShowsLogic);
exports.show_routes.get('/filter-options', (0, _middlewares_1.checkrequiredHeaders)(['authorization']), (0, _middlewares_1.authenticateUser)(false), _logic_1.fetchShowFilterLogic);
//# sourceMappingURL=show.routes.js.map