
import createHttpError from "http-errors";
import Trip from '../models/trip.model.js';
import User from '../models/user.model.js';

export async function create(req, res) {

    const { 
        title,
        country,
        startDate,
        endDate,
        description,
        travelers = [],
        isSurprise,
        revealDate
    } = req.body;

    const travelerIds = travelers.map(t => t.user);
    
    const users = await User.find({ _id: { $in: travelerIds } });

    if (users.length !== travelerIds.length) {
        throw createHttpError(404, "One or more users not found");
    }

    const trip = await Trip.create({
        title,
        country,
        startDate,
        endDate,
        description,
        userOwner: req.session.user.id,
        travelers: [
            { 
                user: req.session.user.id, 
                role: 'traveler'
            }, 
            ...users.map(user => ({
                user: user.id,
                role: "traveler"
            }))
        ],
        isSurprise,
        revealDate
    });

    res.json({ success: true, data: trip });
}

export async function list(req, res) {

    const criteria = {};

    if (req.query.userOwner) {
        criteria.userOwner = req.query.userOwner;
    }

    const trips = await Trip.find(criteria)
        .populate('userOwner', 'email username bio avatar')
        .populate('travelers.user', 'email username bio avatar')
        .populate('places', 'name location notes')
        .populate('activities', 'title');
        
    res.json({ success: true, data: trips });
}

export async function details(req, res) {
    
    const trip = req.trip
        .populate('userOwner', 'email username bio avatar')
        .populate('travelers.user', 'email username bio avatar')
        .populate('places', 'name location notes')
        .populate('activities', 'title');

    res.json({ success: true, data: trip });
}

export async function update(req, res) {

    const trip = req.trip;

    delete req.body.userOwner;
    
    Object.assign(trip, req.body);

    await trip.save();

    res.json({ success: true, data: trip });
}

export async function remove(req, res) {

    await Trip.findByIdAndDelete(req.trip.id);

    res.status(204).end();
}

export async function addTraveler(req, res) {

    // Deberia comprobar que el usuario existe?
    
    const trip = await Trip.findOneAndUpdate(
        { _id: req.params.tripId, "travelers.user": { $ne: req.body.userId } },
        { $push: { travelers: { user: req.body.userId, role: "traveler" } } },
        { new: true, runValidators: true }
    );

    if (!trip) throw createHttpError(409, 'Traveler found in this trip');

    res.send({ success: true });
}

export async function delTraveler(req, res) {
    
    const trip = await Trip.findOneAndUpdate(
        { _id: req.params.tripId, "travelers.user": req.body.userId },
        { $pull: { travelers: { user: req.body.userId } } },
        { new: true }
    );

    if (!trip) throw createHttpError(404, "Traveler not found in this trip");

    res.send({ success: true });
}