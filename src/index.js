import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";

import homeRouter from "./routers/home";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use("/", homeRouter);

const PORT = process.env.PORT || 4000;
const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening());
