const db = require("../models");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//  register
const register = async (req, res, next) => {
  const { username, email, password } = await req.body;

  if (!email || !password) {
    return res.status(401).json({ Error: "Sorry you have missing fields" });
  }

  const emailUsed = await db.User.findOne({ where: { email } });
  if (username) {
    const usernameUsed = await db.User.findOne({
      where: { username },
    });
    if (usernameUsed)
      return res.status(401).json({ Error: "Sorry this username is used " });
  }

  if (emailUsed)
    return res.status(401).json({ Error: "Sorry this mail is used " });

  const hashedPassword = bycrypt.hash(password, 10);

  const newUser = await db.User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(200).json("You have sucessfuly registered");
};

// login
const login = async (req, res, next) => {
  const { email, password } = req.body;

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
  const isValid = await bycrypt.compare(password, user.password);

  if (!isValid) {
    return res
      .status(401)
      .json({ error: "Sorry, Email & Password is not correct" });
  }

  const token = jwt.sign({ 
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role
   }, process.env.TOKEN_SECREN, {
    expiresIn: "1h",
  });

  return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" });
};

module.exports = {
  register,
  login,
};
