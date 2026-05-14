const Category = require("../../models/category.model");
const system_config = require("../../config/system");

function createTree(arr, parentId = "") {
  const tree = [];

  arr.forEach((item) => {
    if (item.parent_id == parentId) {
      const newItem = {
        ...item, // QUAN TRỌNG
      };

      const children = createTree(arr, item._id.toString());

      if (children.length > 0) {
        newItem.children = children;
      }

      tree.push(newItem);
    }
  });

  return tree;
}

module.exports.categoryMiddleware = async (req, res, next) => {
  const categories = await Category.find().lean();
  const categoryTree = createTree(categories, "");
  console.log(categoryTree);
  res.locals.layoutcategory = categoryTree;
  //   console.log("chạy qua ổn");
  next();
};
