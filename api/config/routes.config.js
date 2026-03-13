
import { Router } from "express";
import createHttpError from "http-errors";

import { checkTripAuth } from '../middlewares/ownerAuth.middleware.js';
import { checkTripMemberAuth } from '../middlewares/tripMemberAuth.middleware.js';

import { upload } from './multer.config.js';

import * as Users from '../controllers/users.controller.js';
import * as Trips from '../controllers/trips.controller.js'; 
import * as Places from '../controllers/places.controller.js';
import * as Activities from '../controllers/activities.controller.js';
import * as Countries from '../controllers/countries.controller.js';

const router = Router();

router.post('/auth/signup', Users.create);
router.post('/auth/login', Users.login);
router.delete('/auth/logout', Users.logout);
router.get('/auth/verify', Users.verify);

router.patch('/profile/me', upload.single('avatar'), Users.update);
router.get('/profile/:id', Users.detail);

router.get('/trips', Trips.list);
router.post('/trips', Trips.create);
router.get('/trips/:tripId', Trips.details);

router.patch('/trips/:tripId', checkTripAuth, Trips.update);
router.delete('/trips/:tripId', checkTripAuth, Trips.remove);
router.patch('/trips/:tripId/add-traveler', checkTripAuth, Trips.addTraveler);
router.patch('/trips/:tripId/remove-traveler', checkTripAuth, Trips.delTraveler);

router.post('/trips/:tripId/places', checkTripMemberAuth, Places.create);
router.patch('/trips/:tripId/places/:placeId', checkTripMemberAuth, Places.update);
router.delete('/trips/:tripId/places/:placeId', checkTripMemberAuth, Places.remove);

router.post('/trips/:tripId/activities', checkTripMemberAuth, Activities.create);
router.patch('/trips/:tripId/activities/:activityId', checkTripMemberAuth, Activities.update);
router.delete('/trips/:tripId/activities/:activityId', checkTripMemberAuth, Activities.remove);

router.get('/countries', Countries.countries);

router.use((req, res) => {
  throw new createHttpError(404, "Route Not Found");
});

export default router;