import Ajv from 'ajv';
import { MongoClient } from 'mongodb';
import { url } from '../config/db.config';
import addFormats from "ajv-formats"

const ajv = new Ajv({coerceTypes: true});
addFormats(ajv);

export default ajv;

export const DataBase = new MongoClient(url);