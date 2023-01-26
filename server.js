const express = require("express");
const app = express();
const router = express.Router()
require("dotenv").config();
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const db = require('./models')
const isAuthed = require('./middleware/isAuthed')
const cookieParser = require("cookie-parser");

// routers
const UserRouter = require("./routes/UserRouter")
const AuthRouter = require("./routes/AuthRouter")

db.sequelize.sync().then(() => {
  app.listen(port , () => console.log("Server Connected PORT" + port))
})


app.use(cookieParser());
app.use("/api/",  AuthRouter)
app.use("/api/users", isAuthed, UserRouter);