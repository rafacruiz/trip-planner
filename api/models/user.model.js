
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters']
    },
    username: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: [3, 'User name must be at least 3 characters'],
        unique: true,
    },
    bio: {
        type: String,
        trim: true,
        maxLength: [200, 'Bio cannot exceed 200 characters'],
    },
    avatar: {
        type: String,
        trim: true,
        default: process.env.DEFAULT_AVATAR,
        minLength: 1
    }
}, {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.password;
        },
    }
});

userSchema.virtual('trips', {
    ref: 'Trip',
    localField: '_id',
    foreignField: 'userOwner'
});

userSchema.virtual('tripsJoined', {
    ref: 'Trip',
    localField: '_id',
    foreignField: 'travelers.user'
});

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;