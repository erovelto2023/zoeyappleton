import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    tagline: String,
    image: {
        type: String,
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    coreIdentity: {
        role: String,
        archetype: String,
        affiliation: String,
        status: String,
    },
    personality: {
        demeanor: String,
        strengths: [String],
        weaknesses: [String],
        motivation: String,
    },
    background: {
        origin: String,
        keyTrauma: String,
        secrets: String,
    },
    narrativeArc: {
        beginning: String,
        turningPoint: String,
        climax: String,
        resolution: String,
    },
    relationships: [{
        name: String,
        description: String,
    }],
});

if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Character;
}

export default mongoose.models.Character || mongoose.model('Character', CharacterSchema);
