import { Response, Request, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import Joi from "joi";

export const errorMiddleware = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ApiError) {
        res.status(error.status).json({
            message: error.message
        });
    } else if (error instanceof Joi.ValidationError) {
        res.status(400).json({
            message: "Validation error",
            details: error.details.map(detail => detail.message)
        });
    } else {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
