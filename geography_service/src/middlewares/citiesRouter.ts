import Router from "koa-router";
import KoaBody from "koa-body";
import convert from "koa-convert";
import { validateRequestBody } from "./validators";
import { Context } from "koa";
import CityService from "../services/city_service";
import { addCityRequestValidate } from "../models/add_city_request.schema";
import { validateStatus } from "./status_validator";
import { ICity } from "../models/city";
import passport from "../libs/passport";

const koaBody = convert(KoaBody());

export const citiesRouter = new Router().post(
  "/",
  passport.authenticate("jwt", { session: false }),
  koaBody,
  validateStatus("premium"),
  validateRequestBody(addCityRequestValidate),
  addContentType("application/json"),
  async (ctx: Context, next) => {
    try {
      ctx.body = await (ctx.cityService as CityService).add(
        ctx.request.body as ICity
      );
      ctx.status = 200;
    } catch (error) {
      ctx.status = 403;
      ctx.body = { error };
    }
  }
);

function addContentType(contentType: string) {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.type = contentType;
    await next();
  };
}
