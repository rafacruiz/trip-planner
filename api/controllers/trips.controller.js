
import createHttpError from "http-errors";
import Trip from '../models/trip.model.js';
import User from '../models/user.model.js';

function tripsSanitizeSurprise(data, userId) {

    const sanitize = (trip) => {
        if (trip.userOwner.id.toString() !== userId.toString() 
            && trip.isSurprise === true
            && trip.revealDate.getTime() >= Date.now()) 
        {
            trip.description = null;
            trip.title = null;
            trip.country = null;
            trip.revealDate = null;
            trip.isSurprise = null;
            trip.places = [];
            trip.activities = [];
        }

        return trip;
    }

    return Array.isArray(data) 
        ? data.map(sanitize) : sanitize(data);
}

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

    const travelerIds = travelers.map(tripUser => tripUser.user);
    
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
        criteria.userOwner = { $in: req.query.userOwner };
    }

    if (req.query.travelers) {
        criteria["travelers.user"] = req.query.travelers;
    }

    if (req.query.country) {
        criteria.country = req.query.country.toLowerCase();
    }

    if (req.query.title) {
        criteria.title = req.query.title;
    }

    if (req.query.description) {
        criteria.description = req.query.description;
    }

    if (req.query.isSurprise) {
        delete criteria.country;
        delete criteria.description;
        criteria.isSurprise = req.query.isSurprise;
    }

    const trips = await Trip.find(criteria)
        .populate('userOwner', 'email username bio avatar')
        .populate('travelers.user', 'email username bio avatar')
        .populate('places', 'name location notes')
        .populate('activities', 'title');

    res.json({ 
        success: true, 
        data: tripsSanitizeSurprise(trips, req.session.user.id) 
    });
}

export async function details(req, res) {
    
    const trip = await Trip.findById(req.params.tripId)
        .populate('userOwner', 'email username bio avatar')
        .populate('travelers.user', 'email username bio avatar')
        .populate('places', 'name location notes')
        .populate('activities', 'title');

    if (!trip) throw createHttpError(404, "Trip not found");
        
    res.json({ 
        success: true, 
        data: tripsSanitizeSurprise(trip, req.session.user.id) 
    });
}

export async function update(req, res) {

    const trip = req.trip;

    delete req.body.userOwner;

    const { 
        title, 
        country, 
        startDate, 
        endDate, 
        description 
    } = req.body;

    Object.assign(
        trip, {  
            title,
            country, 
            startDate, 
            endDate, 
            description
        });

    await trip.save();

    res.json({ success: true, data: trip });
}

export async function remove(req, res) {

    await Trip.findByIdAndDelete(req.trip.id);

    res.status(204).end();
}

export async function addTraveler(req, res) {
    

    // primero busqueda del trip por id y comprobar si existe el viajero

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