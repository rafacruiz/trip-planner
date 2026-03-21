
import createHttpError from "http-errors";
import Trip from '../models/trip.model.js';
import User from '../models/user.model.js';

function tripsSanitizeSurprise(data, userId) {

    const sanitize = (trip) => {
        if (trip.userOwner._id.toString() !== userId.toString() 
            && trip.isSurprise === true
            && trip.revealDate.getTime() >= Date.now()) 
        {
            trip.description = 'This is a surprise trip! Details will be revealed on ' + trip.revealDate.toDateString();
            trip.title = 'This is a surprise trip! Details will be revealed on ' + trip.revealDate.toDateString();
            trip.country = 'This is a surprise trip! Details will be revealed on ' + trip.revealDate.toDateString();
            trip.city = 'This is a surprise trip! Details will be revealed on ' + trip.revealDate.toDateString();
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
        city,
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
        country: {
            name: country.name,
            code: country.code,
            flag: country.flag
        },
        city,
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

    res.status(201).json(trip);
}

export async function list(req, res) {
 
    const criteria = {};

    if (req.query.traveler) {
        criteria["travelers.user"] = req.query.traveler;
    }

    if (req.query.country) {
        criteria['country.name'] = req.query.country.toLowerCase();
    }

    if (req.query.city) {
        criteria.city = req.query.city.toLowerCase();
    }

    if (req.query.search) {
        criteria.$text = { $search: req.query.search };
    }

    if (req.query.isSurprise) {
        delete criteria.country;
        delete criteria.description;
        delete criteria.city;
        criteria.isSurprise = req.query.isSurprise === 'true';
    }

    if (req.query.startDate && req.query.endDate) {
        const startDate = new Date(req.query.startDate); 
        const endDate = new Date(req.query.endDate);    
        criteria.startDate = { $gte: startDate, $lte: endDate }
    }

    if (req.query.startDate && !req.query.endDate) {
        const startDate = new Date(req.query.startDate); 
        console.log(startDate)
        criteria.startDate = { $gte: startDate }
    }

    if (req.query.endDate && !req.query.startDate) {
        const endDate = new Date(req.query.endDate); 
        console.log(endDate)
        criteria.endDate = { $lte: endDate }
    }

    if (req.query.trips) {
        criteria.userOwner = { $ne: req.session.user.id }

        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        criteria.createdAt = { $gte: tenDaysAgo };
    }

    if (req.query.owner) {
        criteria.userOwner = req.session.user.id;
    }

    if (req.query.me) {
        criteria.travelers = { $elemMatch: {
            user: req.session.user.id, role:'traveler'}}
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    const [trips, total] = await Promise.all([
        Trip.find(
            criteria, 
            req.query.search ? { 
                score: 
                { 
                    $meta: "textScore" 
                } 
            } : {}
        )
        .sort(
            req.query.search ? { 
                score: { 
                    $meta: "textScore", 
                    createdAt: -1 
                } 
            } : { 
                createdAt: -1 
            }
        )
        .populate({
            path: "userOwner",
            select: "username avatar",
        })
        .populate({
            path: "travelers.user",
            select: "username avatar",
        })
        .populate({
            path: "places",
            select: "name location visited",
        })
        .populate({
            path: "activities",
            select: "title completed",
        })
        .limit(limit)
        .skip(startIndex),

        Trip.countDocuments(criteria)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
        data: tripsSanitizeSurprise(trips, req.session.user.id),
        pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        } 
    });
}

export async function details(req, res) {
    
    const trip = await Trip.findById(req.params.tripId)
        .populate('userOwner', 'email username bio avatar')
        .populate('travelers.user', 'email username bio avatar')
        .populate('places', 'name location notes visited')
        .populate('activities', 'title completed');
    
    if (!trip) throw createHttpError(404, "Trip not found");
        
    res.json(tripsSanitizeSurprise(trip, req.session.user.id));
}

export async function update(req, res) {

    const trip = req.trip;

    delete req.body.userOwner;

    const { 
        title, 
        country,
        city, 
        startDate, 
        endDate, 
        description 
    } = req.body;

    Object.assign(
        trip, {  
            title,
            country: {
                name: country.name,
                code: country.code,
                flag: country.flag
            },
            city, 
            startDate, 
            endDate, 
            description
        });

    await trip.save();

    res.json(trip);
}

export async function remove(req, res) {

    await Trip.findByIdAndDelete(req.trip.id);

    res.status(204).end();
}

export async function addTraveler(req, res) {
    
    const TripCurrentTravelers = req.trip;

    const exists = TripCurrentTravelers.travelers.some(traveler => 
        traveler.user.toString() === req.body.userId.toString());
    
    if (exists) throw createHttpError(409, 'Traveler already in this trip');

    TripCurrentTravelers.travelers.push({ user: req.body.userId, role: "traveler" });

    await TripCurrentTravelers.save();

    res.status(204).send()
}

export async function delTraveler(req, res) {

    let travelers = req.trip.travelers

    const exists = travelers.some(
        traveler => traveler.user.toString() === req.body.userId.toString()
    );

    if (!exists) throw createHttpError(404, 'Traveler not found in this trip');

    travelers = travelers.filter(
        traveler => traveler.user.toString() !== req.body.userId.toString()
    );

    Object.assign(req.trip, { travelers });

    await req.trip.save();

    res.status(204).end();
}