import { Schema, model, connect } from 'mongoose';

interface IUser {
  _id: string;
  name: string;
}

const userSchema = new Schema<IUser>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);

