
import createHttpError from "http-errors";
import Place from '../models/place.model.js';
import Trip from '../models/trip.model.js';

export async function create(req, res) {

    const trip = await Trip.findById(req.body.trip);
    
    if (!trip) throw createHttpError(404, "Trip not found");

    if (trip.endDate < new Date()) 
        throw createHttpError(400, "Cannot add places to a finished trip");

    const isTraveler = trip.travelers.some(
        t => t.user.toString() === req.session.user.id
    );

    if (!isTraveler && trip.userOwner.toString() !== req.session.user.id) {
        throw createHttpError(403, "You are not part of this trip");
    }

    const placeData = { 
        "name": req.body.name, 
        "location": req.body.location, 
        "notes": req.body.notes, 
        "trip":  req.body.trip
    }
    
    const place = await Place.create(placeData);
    
    res.json(place);
}

export async function update(req, res) {
    
}

export async function remove(req, res) {
    
}