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
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username is invalid, it should contain 8-20 alphanumeric letters and be unique!"]
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