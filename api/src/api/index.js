

import { Router } from "express";

import createHttpError from "http-errors";

import { upload } from '../config/multer.config.js';

import * as Users from './controllers/users.controller.js';
import * as Trips from './controllers/trips.controller.js'; 
import * as Places from './controllers/places.controller.js';
import * as Activities from './controllers/activities.controller.js';
import * as Countries from './controllers/countries.controller.js';

import { checkAuth } from './middlewares/auth.middleware.js';
import { errorHandler } from "./middlewares/errors.middleware.js";
import { clearBody } from './middlewares/clearbody.middleware.js';
import { cors } from './middlewares/cors.middleware.js';
import { checkTripAuth } from './middlewares/ownerAuth.middleware.js';
import { checkTripMemberAuth } from './middlewares/tripMemberAuth.middleware.js';

const apiRoute = Router();

apiRoute.use(cors);

apiRoute.use(checkAuth);

apiRoute.use(clearBody);

apiRoute.post('/auth/signup', Users.create);
apiRoute.post('/auth/login', Users.login);
apiRoute.delete('/auth/logout', Users.logout);
apiRoute.get('/auth/verify', Users.verify);

apiRoute.patch('/profile/me', upload.single('avatar'), Users.update);
apiRoute.get('/profile/:userId', Users.detail);

apiRoute.get('/users', Users.list);

apiRoute.get('/trips', Trips.list);
apiRoute.post('/trips', Trips.create);
apiRoute.get('/trips/:tripId', Trips.details);

apiRoute.delete('/trips/:tripId', checkTripAuth, Trips.remove);
apiRoute.patch('/trips/:tripId/add-traveler', checkTripAuth, Trips.addTraveler);
apiRoute.patch('/trips/:tripId/remove-traveler', checkTripAuth, Trips.delTraveler);
apiRoute.post('/trips/invitations/accept', Trips.confirmInviteTraveler);
apiRoute.post('/trips/invitations/decline', Trips.declineInviteTraveler);
apiRoute.post('/trips/:tripId/invite', checkTripAuth, Trips.inviteTraveler);

apiRoute.post('/trips/:tripId/places', checkTripMemberAuth, Places.create);
apiRoute.patch('/trips/:tripId/places/:placeId', checkTripMemberAuth, Places.update);
apiRoute.delete('/trips/:tripId/places/:placeId', checkTripMemberAuth, Places.remove);

apiRoute.post('/trips/:tripId/activities', checkTripMemberAuth, Activities.create);
apiRoute.patch('/trips/:tripId/activities/:activityId', checkTripMemberAuth, Activities.update);
apiRoute.delete('/trips/:tripId/activities/:activityId', checkTripMemberAuth, Activities.remove);

apiRoute.get('/countries', Countries.countries);

apiRoute.use((req, res) => {
  throw new createHttpError(404, "Route Not Found");
});

apiRoute.use(errorHandler);

export default apiRoute;

