
import createHttpError from "http-errors";
import Trip from '../models/trip.model.js';

export async function checkTripMemberAuth(req, res, next) {

    const trip = await Trip.findById(req.params.tripId);

    if (!trip) throw createHttpError(404, "Trip not found");

    if (trip.endDate.getTime() < Date.now()) {
        throw createHttpError(400, "Cannot add places to a finished trip");
    }

    const isTraveler = trip.travelers.some(
        t => t.user.toString() === req.session.user.id
    );

    const userId = req.session.user.id;

    const isOwner = trip.userOwner.toString() === userId.toString();

    if (!isOwner && !isTraveler) {
        return next(createHttpError(403, "You don't have access to this trip"));
    }

    req.trip = trip;
    req.tripRole = isOwner ? 'owner' : 'traveler';

    next();
};