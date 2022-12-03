import { JSONSchemaType } from "ajv";
import ajv from ".";

interface IAddCityRequest {
    name: string;
}

export interface IAddCityResponse {
    _id: string;
}

export interface IAddCityError {
    error: string;
}

const addCityRequestSchema: JSONSchemaType<IAddCityRequest> = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};

export const addCityRequestValidate = ajv.compile<IAddCityRequest>(addCityRequestSchema);
