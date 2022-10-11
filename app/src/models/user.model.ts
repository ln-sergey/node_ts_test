import { Schema, model, connect } from 'mongoose';

interface IUser {
  id: string;
  name: string;
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);

