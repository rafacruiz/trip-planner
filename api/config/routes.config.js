
import { Router } from "express";
import createHttpError from "http-errors";

import * as User from '../controllers/users.controller.js';

const router = Router();

router.post('/auth/signup', User.create);
router.post('/auth/login', User.login);
router.delete('/auth/logout', User.logout);
router.get('/auth/verify', User.verify);

export default router;