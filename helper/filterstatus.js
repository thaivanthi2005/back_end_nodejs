module.exports = (query) => {
  let category = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Còn hàng",
      status: "InStock",
      class: "",
    },
    {
      name: "Hết hàng",
      status: "OutStock",
      class: "",
    },
  ];

  if (query.status) {
    const index = category.findIndex((item) => item.status == query.status);
    category[index].class = "active";
  } else {
    const index = category.findIndex((item) => item.status == "");
    category[index].class = "active";
  }
  return category;
};
