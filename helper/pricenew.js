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
