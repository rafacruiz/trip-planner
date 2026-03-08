
import express from "express";

import morgan from "morgan";

import "./config/db.config.js";

import router from "./config/routes.config.js";

import { checkAuth } from './middlewares/auth.middleware.js';
import { errorHandler } from "./middlewares/errors.middleware.js";
import { clearBody } from './middlewares/clearbody.middleware.js';
import { cors } from './middlewares/cors.middleware.js';

const app = express()

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(cors);

app.use(express.json());

app.use(checkAuth);

app.use(clearBody);

app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})