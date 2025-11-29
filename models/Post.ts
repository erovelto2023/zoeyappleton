import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
        type: String,
        required: [true, 'Please provide content.'],
    },
    excerpt: {
        type: String,
        maxlength: [200, 'Excerpt cannot be more than 200 characters'],
    },
    tags: [String],
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
