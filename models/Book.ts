import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this book.'],
        maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    coverImage: {
        type: String,
        required: [true, 'Please provide a cover image URL.'],
    },
    blurb: {
        type: String,
        required: [true, 'Please provide a blurb.'],
    },
    buyLinks: {
        amazon: String,
        kobo: String,
        apple: String,
        google: String,
        direct: String,
    },
    tropes: [String],
    heatLevel: {
        type: Number,
        min: 1,
        max: 5,
    },
    releaseDate: Date,
    seriesOrder: Number,
    series: String,
    themes: [String],
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    sexualTension: String,
    explicitScenes: String,
    idealReader: [String],
    reviews: [{
        user: String,
        rating: Number,
        text: String,
        date: String,
        source: String,
    }],
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Book;
}

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
