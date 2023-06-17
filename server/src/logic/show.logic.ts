import { getShowFilterOptions, getShows } from "@services";
import { Request, Response } from "express";

export const fetchShowsLogic = async (req: Request, res: Response) => {
    try {
       let data = await getShows(req.searchQuery, req.limit, req.skip);
       res.status(200).json({message:"Shows fetched successfully", ...data, status:"success"});
    } catch (error) {
        res.status(500).json({message:"Internal server error", error, status:"error"})
    }
}

export const fetchShowFilterLogic = async (req: Request, res: Response) => {
    try {
        let types = await getShowFilterOptions();
        res.status(200).json({message:"Show filter options fetched successfully", types, status:"success"});
    } catch (error) {
        res.status(500).json({message:"Internal server error", error, status:"error"})
    }
}