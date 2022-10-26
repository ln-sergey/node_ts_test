import { JSONSchemaType } from "ajv";
import ajv from ".";

export const usersCollectionName = "users";

export interface IUser {
  name: string;
  email: string;
  city: string;
  status: string;
}

export const userSchema: JSONSchemaType<IUser> = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: {
      type: "string",
      format: "email",
    },
    city: { type: "string" },
    status: {
      type: "string",
      enum: ["premium", "regular"],
    },
  },
  required: ["name", "email", "city", "status"],
};

export const userValidate = ajv.compile<IUser>(userSchema);
