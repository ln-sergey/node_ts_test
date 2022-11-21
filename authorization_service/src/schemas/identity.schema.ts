import mongoose from "mongoose";

export interface IIdentityMessage {
  _id: string;
  email: string;
  city: string;
}

export interface IIdentity extends IIdentityMessage {
  code: string;
}
