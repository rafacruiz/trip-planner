
import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [5, 'Name cannot min 5 characters']
    },
    location: {
        type: String,
        trim: true,
        minLength: [2, 'Location cannot min 2 characters']
    },
    notes: {
        type: String, 
        maxLength: [500, 'Notes cannot exceed 500 characters'],
    },
    visited: {
        type: Boolean,
        required: [true, 'Visited is required'],
        default: false 
    },
    trip: {
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
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

const Place = mongoose.model('Place', placeSchema);

export default Place;