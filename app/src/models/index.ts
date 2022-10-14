import { MongoClient } from 'mongodb';
import { url } from '../config/db.config';

export { IUser } from './user.model';

export const DataBase = new MongoClient(url);