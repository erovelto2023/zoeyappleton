import mongoose from 'mongoose';

const GlossaryTermSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: [true, 'Please provide a keyword.'],
        unique: true,
    },
    slug: {
        type: String,
        required: [true, 'Please provide a slug.'],
        unique: true,
    },
    hook: {
        type: String,
        required: [true, 'Please provide a hook.'],
    },
    definition: {
        type: String,
        required: [true, 'Please provide a definition.'],
    },
    whyWeLoveIt: {
        type: String,
    },
    microTropes: {
        type: [String],
        default: [],
    },
    subGenreVariations: {
        type: String,
    },
    heatLevel: {
        type: String,
    },
    relatedTropes: {
        type: [String],
        default: [],
    },
    redFlags: {
        type: String,
    },
    seoKeywords: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.GlossaryTerm;
}

export default mongoose.models.GlossaryTerm || mongoose.model('GlossaryTerm', GlossaryTermSchema);
