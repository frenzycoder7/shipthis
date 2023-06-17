import { createUserLogic, loginUserLogic, validateUserLogic } from "@logic";
import { IRouter, Router } from "express";
import {authenticateUser, checkrequiredBody, checkrequiredHeaders, filterKeysFromObjects} from "@middlewares"
import { user_structure } from "@models";

export const auth_routes: IRouter = Router();

auth_routes.post(
    '/register', 
    checkrequiredBody(filterKeysFromObjects(user_structure)), 
    createUserLogic
);

auth_routes.post(
    '/login',
    checkrequiredBody(['email', 'password']),
    loginUserLogic,
);

auth_routes.get(
    '/validate',
    checkrequiredHeaders(['authorization']),
    authenticateUser(false),
    validateUserLogic,
)