import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
// Also try .env if .env.local doesn't exist or is empty
dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/romance-website';

console.log('Testing connection to:', MONGODB_URI);

async function checkConnection() {
    try {
        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('Successfully connected to MongoDB!');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

checkConnection();
