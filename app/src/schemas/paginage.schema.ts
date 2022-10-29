import { JSONSchemaType } from "ajv/dist/core";
import ajv from ".";

export interface IPaginate {
  limit: number;
  offset: number;
  status: string;
}

const paginateSchema: JSONSchemaType<IPaginate> = {
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

export const paginateValidate = ajv.compile<IPaginate>(paginateSchema);

