import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address.'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message.'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
