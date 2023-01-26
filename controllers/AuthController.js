const db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//  register
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password)
    res.status(401).json({ Error: "Sorry you have missing fields" });

  const emailUsed = await db.User.findOne({ where: { email } });
  console.log(emailUsed);
  if (username) {
    const usernameUsed = await db.User.findOne({
      where: { username },
    });
    if (usernameUsed)
      return res.status(401).json({ Error: "Sorry this username is used " });
  }

  if (emailUsed)
    return res.status(401).json({ Error: "Sorry this mail is used " });

  const newUser = await db.User.create({
    username,
    email,
    password,
  });

  res.status(200).json("You have sucessfuly registered");
};

// login
const login = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password)
    return res.status(401).json({ Error: "Sorry you have missing fields" });

  const user = await db.User.findOne({
    where: { email },
  });

  if (!user) {
    return res
      .status(401)
      .json({ error: "Sorry, Email & Password is not correct" });
  }

  const isValid = password === user.dataValues.password;

  if (!isValid) {
    return res
      .status(401)
      .json({ error: "Sorry, Email & Password is not correct" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECREN, {
    expiresIn: "1h",
  });

  return res.status(200).json(token);
};

module.exports = {
  register,
  login,
};
