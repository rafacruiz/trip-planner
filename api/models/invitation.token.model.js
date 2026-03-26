
import mongoose from "mongoose";

const tokenInviteSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trip: {
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
        required: true,
    },
    token: {
        type: String,
        trim: true,
        required: true,
        minLength: 1
    },
    expireAt: {
        type: Date,
        required: true,
        default: function () {
            const dateNow = new Date();

            dateNow.setDate(dateNow.getDate() + 1);

            return dateNow;
        }
    }, 
    used: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
        },
    }
});

const TokenInvite = mongoose.model('TokenInvite', tokenInviteSchema);

export default TokenInvite;