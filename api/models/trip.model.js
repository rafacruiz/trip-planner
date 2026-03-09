
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minLength: [10, 'Title cannot min 10 characters']
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        minLength: [2, 'Country must be at least 2 characters long'],
        trim: true,
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'], 
        default: new Date() 
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        default: new Date() 
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters'],
    },
    userOwner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    travelers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            enum: ['owner', 'traveler']
        }
    }],
    isSurprise: {
        type: Boolean,
        required: true,
        default: false
    },
    revealDate: {
        type: Date,
        default: new Date() 
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
        },
    }
});

tripSchema.index(
    { _id: 1, "travelers.user": 1 },
    { unique: true }
);

tripSchema.virtual('place', {
    ref: 'Place',
    localField: '_id',
    foreignField: 'trip'
});

tripSchema.virtual('activity', {
    ref: 'Activity',
    localField: '_id',
    foreignField: 'trip'
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;