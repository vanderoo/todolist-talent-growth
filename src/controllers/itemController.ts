import { Request, Response, NextFunction } from 'express';
import * as itemService from '../services/itemService';
import { createItemSchema, updateItemSchema } from '../validations/itemValidation';
import { UserRequest } from '../types/userRequestType';

export const createItem = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const { error } = createItemSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const item = await itemService.createItem({ ...req.body, user: req.userId });
        res.status(201).json({ message: "Item successfully created" });
    } catch (err) {
        next(err);
    }
};

export const getItems = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const items = await itemService.getItems(page, limit, req.userId);
        res.json(items);
    } catch (err) {
        next(err);
    }
};

export const getItemById = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const item = await itemService.getItemById(req.params.id, req.userId);
        res.json(item);
    } catch (err) {
        next(err);
    }
};

export const updateItem = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const { error } = updateItemSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const item = await itemService.updateItem(req.params.id, req.userId, req.body);
        res.status(200).json({ message: "Item successfully updated" });
    } catch (err) {
        next(err);
    }
};

export const deleteItem = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const item = await itemService.deleteItem(req.params.id, req.userId);
        res.status(200).json({ message: "Item successfully deleted" });
    } catch (err) {
        next(err);
    }
};