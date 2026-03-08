
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true, 
        default: new Date() 
    },
    endDate: {
        type: Date,
        required: true,
        default: new Date() 
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500,
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
            required: true,
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

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;