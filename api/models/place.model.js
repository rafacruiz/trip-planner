
import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 5
    },
    location: {
        type: String,
        trim: true,
        minLength: 2
    },
    notes: {
        type: String, 
        maxLength: 200
    },
    visited: {
        type: Boolean,
        required: true,
        default: false 
    },
    trip: {
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
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