import mongoose from 'mongoose';
import { url } from '../config/db.config';

mongoose.Promise = global.Promise;

export const dataBase = {
    mongoose: mongoose,
    url: url,
};