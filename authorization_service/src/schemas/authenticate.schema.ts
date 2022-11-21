import { JSONSchemaType } from "ajv/dist/core";
import ajv from ".";

export interface IAuthenticate {
  email: string;
  code: string;
}

const authenticateSchema: JSONSchemaType<IAuthenticate> = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    code: {
      type: "string",
    },
  },
  required: ["email", "code"],
};

export const authenticateValidate = ajv.compile<IAuthenticate>(authenticateSchema);
