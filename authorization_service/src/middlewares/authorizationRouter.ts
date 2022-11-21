import AuthenticationController from "../controllers/authentication_controller";
import Router from "koa-router";
import KoaBody from "koa-body";
import convert from "koa-convert";
import { validateRequestBody } from "./validators";
import { Context } from "koa";
import { authenticateValidate } from "../schemas/authenticate.schema";

const koaBody = convert(KoaBody());

export const authorizationRouter = new Router()
  .post(
    "/login",
    koaBody,
    validateRequestBody(authenticateValidate),
    addContentType("application/json"),
    
  )

function addContentType(contentType: string) {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.type = contentType;
    await next();
  };
}
