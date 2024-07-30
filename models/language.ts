import { Schema, models, model, Document } from 'mongoose';

interface ILanguage extends Document {
    name: string;
    images: string[];
}

const LanguageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: [String],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: 'Language'
});

const Language = models.Language || model<ILanguage>("Language", LanguageSchema);

export default Language;