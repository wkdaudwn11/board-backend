import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import boardRouter from "./routers/board";

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  console.log(`Connected to mongo server: ${process.env.MONGO_URL}`);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use("/board", boardRouter);

const PORT = process.env.PORT || 4000;
const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}...`);

app.listen(PORT, handleListening());
