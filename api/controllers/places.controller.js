
import createHttpError from "http-errors";
import Place from '../models/place.model.js';

export async function create(req, res) {

    const { name, location, notes } = req.body;

    const tripCurrent = req.trip;

    if (tripCurrent.endDate.getTime() < Date.now()) {
        throw createHttpError(400, "Cannot add places to a finished trip");
    }

    const isTraveler = tripCurrent.travelers.some(
        t => t.user.toString() === req.session.user.id
    );

    if (!isTraveler && tripCurrent.userOwner.toString() !== req.session.user.id) {
        throw createHttpError(403, "You are not part of this trip");
    }
    
    const place = await Place.create({ name, location, notes, trip: tripCurrent.id });
    
    res.json({ success: true, data: {
        name: place.name,
        location: place.location,
        notes: place.notes,
        trip: place.trip
    } });
}

export async function update(req, res) {

    const place = await Place.findById(req.params.placeId);

    if (!place) throw createHttpError(404, "Place not found");

    Object.assign(place, { visited: !place.visited });

    await place.save();

    res.json({ success: true });
}

export async function remove(req, res) {
    
    await Place.findByIdAndDelete(req.params.placeId);

    res.status(204).end();
}