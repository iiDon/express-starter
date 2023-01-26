const express = require("express");
const route = express.Router();
const { register, login } = require("../controllers/AuthController");

route.post("/login", login);
route.post("/register", register);

module.exports = route;
