
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5
    },
    completed: {
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

Activity = mongoose.model('Activity', activitySchema);

export default Activity;