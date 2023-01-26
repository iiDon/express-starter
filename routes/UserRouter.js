const express = require("express");
const route = express.Router();
const { getAllUsers, me } = require("../controllers/UserController");

route.get("/", getAllUsers);
route.get("/me", me);

module.exports = route;
