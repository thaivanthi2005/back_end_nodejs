module.exports.pricenew = (product) => {
  const newProduct = product.map((item) => {
    item.pricenew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  return newProduct;
};

// Cho single product (dùng ở checkout)
module.exports.pricenewSingle = (product) => {
  return ((product.price * (100 - product.discountPercentage)) / 100).toFixed(
    0,
  );
};
