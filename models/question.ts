import mongoose, { Schema, models, model, Document, ObjectId } from 'mongoose';

export interface IQuestion extends Document {
    _id: ObjectId;
    title: string;
    author: ObjectId;
    tags: string[];
}

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [String],
    likes: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: 'Question'
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;