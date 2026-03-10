
import { Router } from "express";
import createHttpError from "http-errors";

import { checkTripAuth } from '../middlewares/tripAuth.middleware.js';

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

router.patch('/trips/:tripId', checkTripAuth, Trip.update);
router.delete('/trips/:tripId', checkTripAuth, Trip.remove);
router.patch('/trips/:tripId/add-traveler', checkTripAuth, Trip.addTraveler);
router.patch('/trips/:tripId/remove-traveler', checkTripAuth, Trip.delTraveler);

router.post('/trips/:tripId/places', checkTripAuth, Place.create);
router.patch('/trips/:tripId/places/:placeId/visited', checkTripAuth, Place.update);
router.delete('/trips/:tripId/places/:placeId', checkTripAuth, Place.remove);

router.post('/trips/:tripId/activities', checkTripAuth, Activity.create);
router.patch('/trips/:tripId/activities/:activityId', checkTripAuth, Activity.update);
router.delete('/trips/:tripId/activities/:activityId', checkTripAuth, Activity.remove);

router.use((req, res) => {
  throw new createHttpError(404, "Route Not Found");
});

export default router;