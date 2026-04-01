import mongoose from "mongoose";
import "../src/config/db.config.js";

import User from "../src/models/user.model.js";
import Trip from "../src/models/trip.model.js";
import Place from "../src/models/place.model.js";
import Activity from "../src/models/activity.model.js";

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
    endDate.setDate(
        startDate.getDate() +
        Math.floor(Math.random() * 7) + 3
    );

    const revealDate = new Date(startDate);
    revealDate.setDate(startDate.getDate() - 3);

    return { startDate, endDate, revealDate };
}

function randomStatus() {
    const statuses = ["accepted", "pending"];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

/* =========================
   DATA BASE (VARIADA)
========================= */

const tripTemplates = [
    {
        title: "Tokyo Adventure",
        description: "Culture, sushi and neon lights.",
        imageUrl: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
        country: { name: "japan", code: "JP", flag: "🇯🇵" },
        city: "Tokyo"
    },
    {
        title: "Roman Holidays",
        description: "History and Italian food.",
        imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        country: { name: "italy", code: "IT", flag: "🇮🇹" },
        city: "Rome"
    },
    {
        title: "Iceland Roadtrip",
        description: "Waterfalls and northern lights.",
        imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        country: { name: "iceland", code: "IS", flag: "🇮🇸" },
        city: "Reykjavik"
    },
    {
        title: "Paris Getaway",
        description: "Romantic escape in Paris.",
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        country: { name: "france", code: "FR", flag: "🇫🇷" },
        city: "Paris"
    },
    {
        title: "New York Trip",
        description: "The city that never sleeps.",
        imageUrl: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59",
        country: { name: "usa", code: "US", flag: "🇺🇸" },
        city: "New York"
    },
    {
        title: "Barcelona Vibes",
        description: "Beach + architecture.",
        imageUrl: "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5",
        country: { name: "spain", code: "ES", flag: "🇪🇸" },
        city: "Barcelona"
    }
];

/* =========================
   GENERATORS
========================= */

function getRandomTraveler(trip) {
    const traveler = trip.travelers[
        Math.floor(Math.random() * trip.travelers.length)
    ];
    return traveler.user;
}

function generatePlaces(city, trip) {
    const base = [
        "Main Square",
        "Museum",
        "Cathedral",
        "Park",
        "Viewpoint"
    ];

    return base
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(name => ({
            name: `${name} of ${city}`,
            location: city,
            notes: Math.random() > 0.5 ? "Must visit!" : "",
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
   MAIN SEED
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

    const numberOfTrips = Math.floor(Math.random() * 6) + 15; // 15–20

    const tripsToInsert = [];

    for (let i = 0; i < numberOfTrips; i++) {

        const template =
            tripTemplates[
                Math.floor(Math.random() * tripTemplates.length)
            ];

        const owner =
            users[Math.floor(Math.random() * users.length)];

        const travelers = users
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map(user => ({
                user: user._id,
                name: user.username,
                status:
                    user._id.toString() === owner._id.toString()
                        ? "accepted"
                        : randomStatus()
            }));

        const { startDate, endDate, revealDate } = createTripDates();

        tripsToInsert.push({
            ...template,
            isSurprise: Math.random() > 0.5,
            startDate,
            endDate,
            revealDate,
            userOwner: owner._id,
            travelers
        });
    }

    // 1. Crear trips
    const createdTrips = await Trip.insertMany(tripsToInsert);

    // 2. Crear places & activities
    const placesToInsert = [];
    const activitiesToInsert = [];

    createdTrips.forEach(trip => {
        placesToInsert.push(...generatePlaces(trip.city, trip));
        activitiesToInsert.push(...generateActivities(trip));
    });

    // 3. Insertar
    await Place.insertMany(placesToInsert);
    await Activity.insertMany(activitiesToInsert);

    console.log(`[OK] ${createdTrips.length} trips created`);
    console.log(`[OK] ${placesToInsert.length} places created`);
    console.log(`[OK] ${activitiesToInsert.length} activities created`);

    mongoose.connection.close();
}

seedTrips().catch(error => {
    console.error("[ERROR]", error);
    mongoose.connection.close();
    process.exit(1);
});