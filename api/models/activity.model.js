
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minLength: [5, 'Title cannot min 5 characters']
    },
    completed: {
        type: Boolean,
        required: [true, 'Completed is required'],
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

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;