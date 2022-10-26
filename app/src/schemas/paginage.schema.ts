import { JSONSchemaType } from "ajv/dist/core";
import ajv from ".";

export interface IPaginage {
  limit: number;
  offset: number;
  status: string;
}

const paginageSchema: JSONSchemaType<IPaginage> = {
  type: "object",
  properties: {
    limit: {
      type: "number",
      maximum: 200,
      minimum: 0,
    },
    offset: {
      type: "number",
    },
    status: {
      type: "string",
      enum: ["premium", "regular"],
    },
  },
  required: ["offset", "limit"],
}

export const paginageValidate = ajv.compile<IPaginage>(paginageSchema);

