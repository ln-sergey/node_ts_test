import UserController from "../controllers/user_controller";
import Router from "koa-router";
import KoaBody from "koa-body";
import convert from "koa-convert";
import { validateQuery, validateRequestBody } from "./validators";
import { userValidate } from "../schemas/user.schema";
import { paginateValidate } from "../schemas/paginage.schema";
import { addMockUsers } from "../add_mock_data";
import { Context } from "koa";
import { authorizationController } from "../controllers/authorization_controller";
import { userUpdateValidate } from "../schemas/user.update.schema";

const koaBody = convert(KoaBody());

export const usersRouter = new Router()
  .post(
    "/",
    koaBody,
    validateRequestBody(userValidate),
    addContentType("application/json"),
    UserController.create.bind(UserController),
    authorizationController.sendCreate.bind(authorizationController),
  )
  .get(
    "/paginate",
    validateQuery(paginateValidate),
    addContentType("application/json"),
    UserController.paginate.bind(UserController),
  )
  .get(
    "/stats",
    addContentType("application/json"),
    UserController.stats.bind(UserController)
  )
  .get(
    "/:id",
    addContentType("application/json"),
    UserController.getOne.bind(UserController)
  )
  .put(
    "/:id",
    koaBody,
    validateRequestBody(userUpdateValidate),
    addContentType("application/json"),
    UserController.update.bind(UserController),
    authorizationController.sendUpdate.bind(authorizationController),
  )
  .delete(
    "/:id",
    addContentType("application/json"),
    UserController.delete.bind(UserController),
    authorizationController.sendDelete.bind(authorizationController),
  )
  .get("/addmock/users", addMockUsers);

function addContentType(contentType: string) {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.type = contentType;
    await next();
  };
}
