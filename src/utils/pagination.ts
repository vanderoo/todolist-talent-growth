export const getPagination = (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

export const getPagingData = (data: any, page: number, limit: number) => {
  const totalItems = data.totalDocs || data.total || 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems,
    totalPages,
    currentPage: page,
    itemsPerPage: limit,
    data: data.data
  };
};