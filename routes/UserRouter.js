const express = require("express");
const route = express.Router();
const { getAllUsers } = require("../controllers/UserController");

route.get("/", getAllUsers);

module.exports = route;
