import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import { Context } from "koa";
import { ValueError } from "../errors";

const ajv = new Ajv();

export const validateRequestBody = <T>(validate: ValidateFunction) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const isPayloadValid = validate(ctx.body);
    if (!isPayloadValid) {
      throw new ValueError(
        validate.errors?.map((error) => error.message).join(", ") ??
          "Unknown error"
      );
    } else {
      await next();
    }
  };
};

export const validateQuery = (validate: ValidateFunction) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const isPayloadValid = validate(ctx.query);
    if (!isPayloadValid) {
      throw new ValueError(
        validate.errors?.map((error) => error.message).join(", ") ??
          "Unknown error"
      );
    } else {
      await next();
    }
  };
};
