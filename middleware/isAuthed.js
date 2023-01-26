const db = require("../models");
const jwt = require("jsonwebtoken");

const isAuthed = async (req, res, next) => {
  const { authorization } = await req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You do not have access" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { userId } = jwt.verify(token, process.env.TOKEN_SECREN);

    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) return res.status(401).json({ error: "Login and try again" });

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = isAuthed;
