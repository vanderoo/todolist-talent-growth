import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { registerSchema, loginSchema } from '../validations/authValidation';
import { UserRequest } from '../types/userRequestType';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    await authService.registerUser(req.body.name, req.body.email, req.body.password);
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const token = await authService.loginUser(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const user = await authService.getProfile(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
