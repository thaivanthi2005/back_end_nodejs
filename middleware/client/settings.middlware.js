const settings_general = require("../../models/settings_general");

module.exports.settingGeneral = async (req, res, next) => {
  const settings = await settings_general.findOne({});
  res.locals.settings = settings;
  next();
};
