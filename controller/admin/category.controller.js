const Product1 = require("../../models/category.model");

module.exports.category = async (req, res) => {
  const categories = await Product1.find().lean();
  const categoryTree = createTree(categories, "");
  res.render("admin/pages/category/index", {
    pagetitle: "Danh mục sản phẩm",
    products: categoryTree,
  });
};

// --------------------Create--------------------------------

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

module.exports.category_create = async (req, res) => {
  const categories = await Product1.find().lean();
  const categoryTree = createTree(categories, "");

  console.log(JSON.stringify(categoryTree, null, 2));

  res.render("admin/pages/category/create", {
    pagetitle: "Tạo danh mục sản phẩm",
    products: categoryTree,
  });
};

module.exports.category_create_post = async (req, res) => {
  const product = new Product1(req.body);
  await product.save();
  res.redirect(req.get("referer"));
};

// --------------------END-Create--------------------------------
