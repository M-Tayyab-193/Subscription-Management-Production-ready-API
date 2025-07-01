import mongoose from 'mongoose'
import {NODE_ENV, DB_URI } from '../config/env.js'

if(!DB_URI) {
    throw new Error('Please define the Mongo_URI environment variable in .env.<development/production>/local');
}

const connectToDatabase = async () => {
    try{
         await mongoose.connect(DB_URI);
         console.log(`Connected to database in ${process.env.NODE_ENV} mode.`);
    }
    catch(err){
      console.log('Error in making connection:', err);
      process.exit(1);
    }
}

export default connectToDatabase;
