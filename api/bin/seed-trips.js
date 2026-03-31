import mongoose from "mongoose";
import "../config/db.config.js";

import User from "../models/user.model.js";
import Trip from "../models/trip.model.js";

function randomFutureDate(days = 60) {

    const now = new Date();

    return new Date(
        now.getTime() +
        Math.floor(Math.random() * days)
        * 24 * 60 * 60 * 1000
    );
}

function createTripDates() {

    const startDate =
        randomFutureDate(60);

    const endDate =
        new Date(startDate);

    endDate.setDate(
        startDate.getDate() +
        Math.floor(Math.random() * 7) + 3
    );

    const revealDate =
        new Date(startDate);

    revealDate.setDate(
        startDate.getDate() - 3
    );

    return {
        startDate,
        endDate,
        revealDate
    };
}

function randomStatus() {

    const statuses = [
        "accepted",
        "pending"
    ];

    return statuses[
        Math.floor(
            Math.random() * statuses.length
        )
    ];
}

async function seedTrips() {

    if (mongoose.connection.readyState !== 1) {

        await new Promise(resolve =>
            mongoose.connection.once(
                "connected",
                resolve
            )
        );
    }

    const users =
        await User.find();

    if (!users.length) {

        console.log(
            "Run user seed first."
        );

        process.exit();
    }

    const tripsBase = [

        // 🇯🇵 JAPAN

        {
            title: "Tokyo Adventure",

            description:
                "A surprise adventure in Tokyo full of culture, sushi and neon lights.",

            imageUrl:
                "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",

            country: {
                name: "japan",
                code: "JP",
                flag: "🇯🇵"
            },

            city: "Tokyo",

            isSurprise: true,

            places: [

                {
                    name: "Shibuya Crossing",
                    location: "Tokyo",
                    visited: false
                },

                {
                    name: "Senso-ji Temple",
                    location: "Asakusa",
                    visited: true
                },

                {
                    name: "Tokyo Skytree",
                    location: "Sumida",
                    visited: false
                }

            ],

            activities: [

                {
                    title:
                        "Eat sushi at Tsukiji Market",
                    completed: true
                },

                {
                    title:
                        "Visit Akihabara",
                    completed: false
                }

            ]

        },

        // 🇮🇹 ITALY

        {
            title: "Roman Holidays",

            description:
                "Explore Rome’s history and enjoy Italian food.",

            imageUrl:
                "https://images.unsplash.com/photo-1552832230-c0197dd311b5",

            country: {
                name: "italy",
                code: "IT",
                flag: "🇮🇹"
            },

            city: "Rome",

            isSurprise: false,

            places: [

                {
                    name: "Colosseum",
                    location: "Rome",
                    visited: true
                },

                {
                    name: "Trevi Fountain",
                    location: "Rome",
                    visited: false
                },

                {
                    name: "Vatican Museums",
                    location: "Vatican City",
                    visited: false
                }

            ],

            activities: [

                {
                    title:
                        "Eat gelato",
                    completed: true
                },

                {
                    title:
                        "Visit Roman Forum",
                    completed: false
                }

            ]

        },

        // 🇮🇸 ICELAND

        {
            title: "Iceland Roadtrip",

            description:
                "Discover waterfalls, glaciers and northern lights.",

            imageUrl:
                "https://images.unsplash.com/photo-1501785888041-af3ef285b470",

            country: {
                name: "iceland",
                code: "IS",
                flag: "🇮🇸"
            },

            city: "Reykjavik",

            isSurprise: true,

            places: [

                {
                    name: "Blue Lagoon",
                    location: "Grindavik",
                    visited: false
                },

                {
                    name: "Golden Circle",
                    location: "Thingvellir",
                    visited: false
                }

            ],

            activities: [

                {
                    title:
                        "Northern lights tour",
                    completed: false
                },

                {
                    title:
                        "Waterfall hike",
                    completed: false
                }

            ]

        }

    ];

    const tripsToInsert = [];

    for (const baseTrip of tripsBase) {

        const owner =
            users[
                Math.floor(
                    Math.random() *
                    users.length
                )
            ];

        const randomTravelers =
            users
                .sort(() => 0.5 - Math.random())
                .slice(0, 4)
                .map(user => {

                    return {

                        user: user._id,

                        name: user.username,

                        status:
                            user._id.toString() ===
                            owner._id.toString()
                                ? "accepted"
                                : randomStatus()

                    };

                });

        const {
            startDate,
            endDate,
            revealDate
        } = createTripDates();

        tripsToInsert.push({

            ...baseTrip,

            startDate,
            endDate,
            revealDate,

            userOwner:
                owner._id,

            travelers:
                randomTravelers

        });

    }

    await Trip.insertMany(
        tripsToInsert
    );

    console.log(
        `[OK] ${tripsToInsert.length} trips created`
    );

    mongoose.connection.close();

}

seedTrips().catch(error => {

    console.error(
        "[ERROR]",
        error
    );

    mongoose.connection.close();

    process.exit(1);

});