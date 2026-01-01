module.exports = (objectPagination, query, coutProduct) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  const totalPage = Math.ceil(coutProduct / objectPagination.limitItem);
  objectPagination.totalPage = totalPage;
  return objectPagination;
};
