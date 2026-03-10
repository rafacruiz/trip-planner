import mongoose from "mongoose";
import "../config/db.config.js";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import User from "../models/user.model.js";

async function seed() {
    if (mongoose.connection.readyState !== 1) {
        await new Promise((resolve) =>
            mongoose.connection.once("connected", resolve)
        );
    }

    await mongoose.connection.dropDatabase();
    console.log("[OK] Database dropped");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const res = await fetch("https://randomuser.me/api/?results=50");
    const data = await res.json();

    const usersData = data.results.map((user) => {
        return {
            username: `${user.name.first} ${user.name.last}`,
            email: user.email,
            password: hashedPassword,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            avatar: user.picture.medium,
        };  
    });

    await User.insertMany(usersData);
    console.log(`[OK] ${usersData.length} users created`);
    mongoose.connection.close();
}

seed().catch((error) => {
    console.error("[ERROR]", error);
    mongoose.connection.close();
    process.exit(1);
});