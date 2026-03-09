
import { Router } from "express";
import createHttpError from "http-errors";

import * as User from '../controllers/users.controller.js';
import * as Trip from '../controllers/trips.controller.js'; 
import * as Place from '../controllers/places.controller.js';
import * as Activity from '../controllers/activities.controller.js';

const router = Router();

router.post('/auth/signup', User.create);
router.post('/auth/login', User.login);
router.delete('/auth/logout', User.logout);
router.get('/auth/verify', User.verify);

router.get('/profile/:id', User.detail);

router.get('/trips', Trip.list);
router.post('/trips', Trip.create);
router.get('/trips/:tripId', Trip.details);
router.patch('/trips/:tripId', Trip.update);
router.delete('/trips/:tripId', Trip.remove);
router.patch('/trips/:tripId/add-traveler', Trip.addTraveler);
router.patch('/trips/:tripId/remove-traveler', Trip.delTraveler);

router.post('/places', Place.create);
router.patch('/places/:placeId', Place.update);
router.patch('/places/:placeId/visited', Place.update);
router.delete('/places/:placeId', Place.remove);

router.use((req, res) => {
  throw new createHttpError(404, "Route Not Found");
});

export default router;