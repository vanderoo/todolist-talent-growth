import * as userRepository from '../repositories/userRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ApiError } from '../utils/apiError';

dotenv.config();

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(400, 'Email already in use');
  }

  const user = await userRepository.createUser({ name, email, password });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
};

export const getProfile = async (userId: string) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};