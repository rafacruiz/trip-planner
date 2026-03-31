
import express from "express";

import morgan from "morgan";

import "./config/db.config.js";

import apiRoute from './api/index.js';

import webRoute from './web/index.js';


const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.json());


app.use('/api', apiRoute);

app.use(webRoute);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})