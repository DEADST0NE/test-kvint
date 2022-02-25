import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url =
  `mongodb://${process.env.APP_MONGO_INITDB_ROOT_USERNAME}:${process.env.APP_MONGO_INITDB_ROOT_PASSWORD}@${process.env.APP_MONGO_HOST}:${process.env.EXPOSE_MONGO_PORT}`;

export default mongoose.connect(url);