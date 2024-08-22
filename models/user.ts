import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActivated: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'User'
});

const User = models.User || model("User", UserSchema);

export default User;