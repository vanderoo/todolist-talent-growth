import * as itemRepository from '../repositories/itemRepository';
import { getPagination, getPagingData } from '../utils/pagination';
import { ApiError } from '../utils/apiError';

export const createItem = async (data: any) => {
  return itemRepository.createItem(data);
};

export const getItems = async (page: number, limit: number, userId: string) => {
  const { skip, limit: paginationLimit } = getPagination(page, limit);
  const items = await itemRepository.getItems(skip, paginationLimit);
  const filteredItems = items.filter(item => item.user.toString() === userId);
  const totalItems = filteredItems.length;
  return getPagingData({ total: totalItems, data: filteredItems }, page, limit);
};

export const getItemById = async (id: string, userId: string) => {
  const item = await itemRepository.getItemById(id);

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  if (item.user.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to access this item');
  }

  return item;
};

export const updateItem = async (id: string, userId: string, data: any) => {
  const item = await itemRepository.getItemById(id);

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  if (item.user.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to update this item.');
  }

  item.set(data);
  await item.save();
  return item;
};

export const deleteItem = async (id: string, userId: string) => {
  const item = await itemRepository.getItemById(id);

  if (!item) {
    throw new ApiError(404, 'Item not found.');
  }

  if (item.user.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to delete this item.');
  }

  await item.deleteOne();
  return item;
};
