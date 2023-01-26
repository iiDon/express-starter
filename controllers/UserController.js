const db = require("../models");

const getAllUsers = async (req, res, next) => {
  const users = await db.User.findAll({
    attributes: ["id", "username", "email"],
  });

  res.status(200).json(users);
};

module.exports = {
  getAllUsers,
};
