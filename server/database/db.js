import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
    const username = encodeURIComponent(process.env.DB_USERNAME);
    const password = encodeURIComponent(process.env.DB_PASSWORD);
    const cluster = process.env.DB_CLUSTER;

    const DB_URI = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with database', error.message);
    }
}

export default Connection;