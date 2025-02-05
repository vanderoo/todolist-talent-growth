import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRequest } from '../types/userRequestType';

dotenv.config();

export const authenticate = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({
      message: 'Authentication required. Please provide a valid token.'
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Token is invalid or expired. Please provide a valid token.'
    });
  }
};