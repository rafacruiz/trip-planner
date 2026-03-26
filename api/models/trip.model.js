
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minLength: [5, 'Title cannot min 5 characters']
    },
    country: {
        code: {
            type: String,
            required: [true, 'Country code is required'],
            minLength: [2, 'Country must be at least 2 characters long'],
            maxLength: [4, 'Country code cannot exceed 4 characters'],
            uppercase: true,
            trim: true,
        },
        name: {
            type: String,
            lowercase: true,
            trim: true
        },
        flag: {
            type: String,
            trim: true,
            default: '🟦'
        }
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        lowercase: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'], 
        default: new Date() 
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: "End date must be after start date"
        }
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
            enum: ['traveler'],
            default: 'traveler'
        },
        status: { 
            type: String, 
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    }],
    isSurprise: {
        type: Boolean,
        required: true,
        default: false
    },
    revealDate: {
        type: Date,
        required: function () {
            return this.isSurprise;
        }
    },
    imageUrl: {
        type: String,
        trim: true,
        minLength: 1
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
    {
        title: "text",
        description: "text",
        city: "text",
        "country.name": "text"
    },
    {
        weights: {
            title: 10,
            city: 6,
            "country.name": 6,
            description: 2
        }
    }
);

tripSchema.virtual('places', {
    ref: 'Place',
    localField: '_id',
    foreignField: 'trip'
});

tripSchema.virtual('activities', {
    ref: 'Activity',
    localField: '_id',
    foreignField: 'trip'
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;