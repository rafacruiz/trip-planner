

import createHttpError from "http-errors";
import Trip from '../models/trip.model.js';

export async function checkTripAuth(req, res, next) {

    const trip = await Trip.findById(req.params.tripId);

    if (!trip) throw createHttpError(404, "Trip not found");

    const isTraveler = trip.travelers.some(
        t => t.user.toString() === req.session.user.id
    );

    const userId = req.session.user.id;

    const isOwner = trip.userOwner.toString() === userId.toString();

    if (!isOwner && !isTraveler) {
        return next(createHttpError(403, "You don't have access to this trip"));
    }

    if (!isOwner && isTraveler) {

        if (trip.endDate.getTime() < Date.now()) {
            throw createHttpError(400, "Cannot add places to a finished trip");
        }

        const allowedForTraveler = ['places', 'activities']; // Añadir a env

        const resource = req.baseUrl.split("/").pop();

        if (!allowedForTraveler.includes(resource)) {
            return next(createHttpError(403, "Traveler not allowed for this resource"));
        }
    }

    req.trip = trip;
    req.tripRole = isOwner ? "owner" : "traveler";

    next();
};