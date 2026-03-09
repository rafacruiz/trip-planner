
import createHttpError from "http-errors";
import Trip from '../models/trip.model.js';

export async function create(req, res) {

    const tripData = {
        'title': req.body.title,
        'country': req.body.country,
        'startDate': req.body.endDate,
        'endDate': req.body.endDate,
        'description': req.body.description,
        'userOwner': req.session.user.id,
        'travelers': [
            { 
                'user': req.session.user.id, 
                'role': 'traveler'
            }, 
            ...req.body.travelers],
        'isSurprise': req.body.isSurprise,
        'revealDate': req.body.revealDate
    }

    const trip = await Trip.create(tripData);

    res.json(trip);
}

export async function list(req, res) {

    const criteria = {};

    if (req.query.userOwner) {
        criteria.userOwner = req.query.userOwner;
    }

    const trips = await Trip.find(criteria)
        .populate('userOwner', 'email username bio avatar')
        .populate('travelers.user', 'email username bio avatar')
        .populate('places', 'name location notes');
        
    res.json(trips);
}

export async function details(req, res) {
    
    const trip = await Trip.findById(req.params.tripId)
        .populate('userOwner', 'email username bio avatar')
        .populate('travelers.user', 'email username bio avatar')
        .populate('places', 'name location notes');

    if (!trip) throw createHttpError(404, 'Trip not found');

    res.json(trip);
}

export async function update(req, res) {

    const trip = await Trip.findById(req.params.tripId);
    
    if (!trip) throw createHttpError(404, "Trip not found");

    if (trip.userOwner.toString() 
        !== req.session.user.id.toString()) {
        throw createHttpError(403, "Not your project");
    }

    delete req.body.userOwner;
    
    Object.assign(trip, req.body);

    await trip.save();

    res.json(trip);
}

export async function remove(req, res) {

    const trip = await Trip.findById(req.params.tripId);

    if (trip.userOwner.toString() 
        !== req.session.user.id.toString()) {
        throw createHttpError(403, "Not your project");
    }

    await Trip.findByIdAndDelete(trip.id);

    res.status(204).end();
}

export async function addTraveler(req, res) {

    // Deberia solo añadir el owner?

    const trip = await Trip.findOneAndUpdate(
        { _id: req.params.tripId, "travelers.user": { $ne: req.body.userId } },
        { $push: { travelers: { user: req.body.userId, role: "traveler" } } },
        { new: true, runValidators: true }
    );

    if (!trip) throw createHttpError(409, 'Traveler found in this trip');

    res.send({ added: true });
}

export async function delTraveler(req, res) {

    // Deberia solo añadir el owner?
    
    const trip = await Trip.findOneAndUpdate(
        { _id: req.params.tripId, "travelers.user": req.body.userId },
        { $pull: { travelers: { user: req.body.userId } } },
        { new: true }
    );

    if (!trip) {
        throw createHttpError(404, "Traveler not found in this trip");
    }

    res.send({ remove: true });
}