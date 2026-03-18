
import createHttpError from "http-errors";
import Place from '../models/place.model.js';

export async function create(req, res) {

    const { name, location, notes } = req.body;

    const tripCurrent = req.trip;

    const place = await Place.create({ 
        name, 
        location, 
        notes, 
        trip: tripCurrent.id,
        author: req.session.user.id
    });
    
    res.json({
        name: place.name,
        location: place.location,
        notes: place.notes,
        trip: place.trip,
        author: place.author
    });
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