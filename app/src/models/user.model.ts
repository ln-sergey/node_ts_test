import objectHash from "object-hash";
import { ValueError } from "../errors";

export type Status = "premium" | "regular"

export interface IUser {
    name: string;
    email: string;
    city: string;
    status: Status;
}

export class User {
  private _model: Object;

  constructor(user: IUser) {
    if (!this.isEmail(user.email)) {
      throw new ValueError("invalid_email");
    }
    if (!this.isStatus(user.status)) {
      throw new ValueError("invalid_status");
    }
    this._model = {
      _id: objectHash(user),
      ...user,
    }
  }

  public get model() : Object {
    return this._model;
  }
  
  private isEmail(value: string): boolean {
    let regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return regexp.test(value);
  }

  private isStatus(value: string): value is Status {
    return ["premium", "regular"].includes(value);
  }
}


