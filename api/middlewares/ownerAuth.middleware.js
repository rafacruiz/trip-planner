

import createHttpError from "http-errors";
import Trip from '../models/trip.model.js';

export async function checkTripAuth(req, res, next) {

    const trip = await Trip.findById(req.params.tripId);

    if (!trip) throw createHttpError(404, "Trip not found");

    const userId = req.session.user.id;

    const isOwner = trip.userOwner.toString() === userId.toString();

    if (!isOwner) {
        throw createHttpError(403, "You don't have access to this trip");
    }

    req.trip = trip;
    req.tripRole = isOwner;

    next();
};