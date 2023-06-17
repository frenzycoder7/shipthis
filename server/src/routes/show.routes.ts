import { fetchShowFilterLogic, fetchShowsLogic } from "@logic";
import { authenticateUser, checkrequiredHeaders, checkrequiredQuery, shearchQuery } from "@middlewares";
import { IRouter, Router } from "express";

export const show_routes: IRouter = Router();

show_routes.get(
    '/',
    checkrequiredHeaders(['authorization']),
    authenticateUser(false),
    checkrequiredQuery(['limit', 'skip']),
    shearchQuery(),
    fetchShowsLogic,
);

show_routes.get(
    '/filter-options',
    checkrequiredHeaders(['authorization']),
    authenticateUser(false),
    fetchShowFilterLogic,
)