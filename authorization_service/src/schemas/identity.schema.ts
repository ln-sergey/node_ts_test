import mongoose from "mongoose";

export interface IIdentityMessage {
  _id: string;
  email: string;
  status: string;
}

export interface IIdentity extends IIdentityMessage {
  code: string;
}
