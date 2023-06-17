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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("./global");
const dotenv_1 = require("dotenv");
const node_http_1 = require("node:http");
const express_1 = __importDefault(require("express"));
const _connection_1 = require("@connection");
const node_process_1 = require("node:process");
const _routes_1 = require("@routes");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)({ path: './.env' });
const ENV = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development";
const PORT = ENV === 'development' ? Number((_b = process.env.TEST_PORT) !== null && _b !== void 0 ? _b : 7002) : Number((_c = process.env.PORT) !== null && _c !== void 0 ? _c : 7001);
const expressApp = (0, express_1.default)();
const DATABASE_URL = ENV === 'development' ? process.env.TEST_DATABASE : process.env.DATABASE;
expressApp.use(express_1.default.json());
expressApp.use(express_1.default.urlencoded({ extended: true }));
expressApp.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
expressApp.use('/api/v1/auth', _routes_1.auth_routes);
expressApp.use('/api/v1/shows', _routes_1.show_routes);
_connection_1.redisClient.on('connect', () => {
    console.log('REDIS STATUS       : CONNECTED');
});
_connection_1.redisClient.on('error', (error) => {
    console.log('Redis connection   : Error');
    console.log(`Message            : ${error.message}`);
});
const startServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, _connection_1.databaseConnection)({ url: DATABASE_URL });
        (0, node_http_1.createServer)(expressApp).listen(PORT, () => {
            console.log(`Server satus       : Running`);
            console.log(`Mode               : ${ENV}`);
            console.log(`PORT               : ${PORT}`);
        });
    }
    catch (error) {
        console.log('Error        : ', error);
        (0, node_process_1.exit)(0);
    }
});
startServices();
//# sourceMappingURL=server.js.map