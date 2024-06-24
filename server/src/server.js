require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const ShortUrlRouter = require("./routes/ShortUrlRouter.js");
const AuthRouter = require("./routes/authRouter.js");

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use("/", AuthRouter);
app.use("/", ShortUrlRouter);

app.listen(process.env.PORT || 5000);
