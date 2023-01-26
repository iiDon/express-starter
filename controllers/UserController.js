const db = require("../models");

const getAllUsers = async (req, res, next) => {
  const id = req.userId;

  const user = await db.User.findOne({
    where: { id },
  });

  if (user.role !== "admin")
    return res.status(401).json({ Error: "Sorry you are not admin" });

  const users = await db.User.findAll({
    attributes: ["id", "username", "email"],
  });

  res.status(200).json(users);
};

const me = async (req, res, next) => {
  const id = req.userId;

  const user = await db.User.findOne(
    {
      where: { id },
      attributes: ["id", "username", "email", "role"],
    },
  );

  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  me,
};
