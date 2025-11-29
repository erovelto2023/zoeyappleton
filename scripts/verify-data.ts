import mongoose from 'mongoose';
import Book from '../models/Book';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/romance-website';

async function verify() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const books = await Book.find({}).sort({ seriesOrder: 1 });
        console.log(`Found ${books.length} books.`);

        fs.writeFileSync('verification_output.json', JSON.stringify(books.map(b => ({
            title: b.title,
            series: b.series,
            order: b.seriesOrder
        })), null, 2));

        console.log('Written to verification_output.json');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

verify();
