import Item from '../models/Item';

export const createItem = async (data: any) => {
  return await Item.create(data);
};

export const getItems = async (skip: number, limit: number) => {
  return await Item.find().skip(skip).limit(limit);
};

export const countItems = async () => {
  return await Item.countDocuments();
};

export const getItemById = async (id: string) => {
  return await Item.findById(id);
};

export const updateItem = async (id: string, data: any) => {
  return await Item.findByIdAndUpdate(id, data, { new: true });
};

export const deleteItem = async (id: string) => {
  return await Item.findByIdAndDelete(id);
};