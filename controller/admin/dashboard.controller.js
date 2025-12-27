module.exports.dashboard = (req, res) => {
  res.render("admin/pages/dashboard/index"),
    {
      pageTitile: "Trang tổng quan",
    };
};
