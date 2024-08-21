import mongoose, { Schema, models, model } from 'mongoose';

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    likes: [mongoose.Schema.Types.ObjectId],
    dislikes: [mongoose.Schema.Types.ObjectId],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: 'Answer'
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;