
import express from "express";

import morgan from "morgan";

import "./config/db.config.js";

const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(morgan("dev"));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})