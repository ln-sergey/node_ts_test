import { JSONSchemaType } from "ajv";
import ajv from ".";

export interface IUserUpdate {
  name?: string;
  email?: string;
  city?: string;
  status?: string;
}

const userUpdateSchema: JSONSchemaType<IUserUpdate> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      nullable: true,
    },
    email: {
      type: "string",
      format: "email",
      nullable: true,
    },
    city: {
      type: "string",
      nullable: true,
    },
    status: {
      type: "string",
      enum: ["premium", "regular"],
      nullable: true,
    },
  },
};

export const userUpdateValidate = ajv.compile<IUserUpdate>(userUpdateSchema);
