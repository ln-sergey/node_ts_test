import Router from "koa-router";
import KoaBody from "koa-body";
import convert from "koa-convert";
import { validateRequestBody } from "./validators";
import { Context } from "koa";
import { authenticateValidate } from "../schemas/authenticate.schema";
import { authenticate } from "./authenticate";

const koaBody = convert(KoaBody());

export const authorizationRouter = new Router().post(
  "/login",
  koaBody,
  validateRequestBody(authenticateValidate),
  addContentType("application/json"),
  authenticate
);

function addContentType(contentType: string) {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.type = contentType;
    await next();
  };
}
