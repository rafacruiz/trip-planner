import mongoose from "mongoose";
import "../src/config/db.config.js";

import User from "../src/models/user.model.js";
import Trip from "../src/models/trip.model.js";
import Place from "../src/models/place.model.js";
import Activity from "../src/models/activity.model.js";

/* =========================
   GEO DATA (CLAVE 🔥)
========================= */

const destinations = [
    {
        city: "tokyo",
        country: {
            name: "japan",
            code: "JP",
            flag: "🇯🇵",
            coordinates: [139.6917, 35.6895]
        },
        title: "Tokyo Adventure",
        description: "Culture, sushi and neon lights.",
        imageUrl: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c"
    },
    {
        city: "rome",
        country: {
            name: "italy",
            code: "IT",
            flag: "🇮🇹",
            coordinates: [12.4964, 41.9028]
        },
        title: "Roman Holidays",
        description: "History and Italian food.",
        imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5"
    },
    {
        city: "reykjavik",
        country: {
            name: "iceland",
            code: "IS",
            flag: "🇮🇸",
            coordinates: [-21.8174, 64.1265]
        },
        title: "Iceland Roadtrip",
        description: "Waterfalls and northern lights.",
        imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    },
    {
        city: "paris",
        country: {
            name: "france",
            code: "FR",
            flag: "🇫🇷",
            coordinates: [2.3522, 48.8566]
        },
        title: "Paris Getaway",
        description: "Romantic escape.",
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
    },
    {
        city: "new york",
        country: {
            name: "usa",
            code: "US",
            flag: "🇺🇸",
            coordinates: [-74.006, 40.7128]
        },
        title: "NYC Trip",
        description: "The city that never sleeps.",
        imageUrl: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59"
    },
    {
        city: "barcelona",
        country: {
            name: "spain",
            code: "ES",
            flag: "🇪🇸",
            coordinates: [2.1734, 41.3851]
        },
        title: "Barcelona Vibes",
        description: "Beach + architecture.",
        imageUrl: "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5"
    }
];

/* =========================
   HELPERS
========================= */

function randomFutureDate(days = 60) {
    const now = new Date();
    return new Date(
        now.getTime() +
        Math.floor(Math.random() * days) *
        24 * 60 * 60 * 1000
    );
}

function createTripDates() {
    const startDate = randomFutureDate(60);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 3);

    const revealDate = new Date(startDate);
    revealDate.setDate(startDate.getDate() - 3);

    return { startDate, endDate, revealDate };
}

function randomStatus() {
    return Math.random() > 0.5 ? "accepted" : "pending";
}

function getRandomTraveler(trip) {
    return trip.travelers[
        Math.floor(Math.random() * trip.travelers.length)
    ].user;
}

/* =========================
   GENERATORS
========================= */

function generatePlaces(city, trip) {
    const base = ["Museum", "Park", "Viewpoint", "Old Town", "Main Square"];

    return base
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(name => ({
            name: `${name} of ${city}`,
            location: city,
            notes: Math.random() > 0.5 ? "Amazing spot!" : "",
            visited: Math.random() > 0.5,
            trip: trip._id,
            author: getRandomTraveler(trip)
        }));
}

function generateActivities(trip) {
    const base = [
        "Try local food",
        "Take photos",
        "City tour",
        "Museum visit",
        "Night out"
    ];

    return base
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(title => ({
            title,
            completed: Math.random() > 0.5,
            trip: trip._id,
            author: getRandomTraveler(trip)
        }));
}

/* =========================
   SEED
========================= */

async function seedTrips() {

    if (mongoose.connection.readyState !== 1) {
        await new Promise(resolve =>
            mongoose.connection.once("connected", resolve)
        );
    }

    const users = await User.find();

    if (!users.length) {
        console.log("Run user seed first.");
        process.exit();
    }

    const numberOfTrips = Math.floor(Math.random() * 6) + 15;

    const tripsToInsert = [];

    for (let i = 0; i < numberOfTrips; i++) {

        const dest =
            destinations[Math.floor(Math.random() * destinations.length)];

        const owner =
            users[Math.floor(Math.random() * users.length)];

        const travelers = users
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map(user => ({
                user: user._id,
                role: "traveler",
                status:
                    user._id.toString() === owner._id.toString()
                        ? "accepted"
                        : randomStatus()
            }));

        const { startDate, endDate, revealDate } = createTripDates();

        tripsToInsert.push({
            title: dest.title,
            description: dest.description,
            imageUrl: dest.imageUrl,
            city: dest.city,
            country: {
                name: dest.country.name,
                code: dest.country.code,
                flag: dest.country.flag,
                location: {
                    type: "Point",
                    coordinates: dest.country.coordinates
                }
            },
            isSurprise: Math.random() > 0.5,
            startDate,
            endDate,
            revealDate,
            userOwner: owner._id,
            travelers
        });
    }

    // 1. Trips
    const createdTrips = await Trip.insertMany(tripsToInsert);

    // 2. Places & Activities
    const places = [];
    const activities = [];

    createdTrips.forEach(trip => {
        places.push(...generatePlaces(trip.city, trip));
        activities.push(...generateActivities(trip));
    });

    await Place.insertMany(places);
    await Activity.insertMany(activities);

    console.log(`[OK] ${createdTrips.length} trips created`);
    console.log(`[OK] ${places.length} places created`);
    console.log(`[OK] ${activities.length} activities created`);

    mongoose.connection.close();
}

seedTrips().catch(err => {
    console.error("[ERROR]", err);
    mongoose.connection.close();
    process.exit(1);
});