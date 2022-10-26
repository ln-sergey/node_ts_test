import UserController from "../controllers/user_controller";
import Router from "koa-router";
import KoaBody from "koa-body";
import convert from "koa-convert";
import { validateQuery, validateRequestBody } from "./validators";
import { userValidate } from "../schemas/user.schema";
import { paginageValidate } from "../schemas/paginage.schema";
import { addMockUsers } from "../add_mock_data";

const koaBody = convert(KoaBody());

export const usersRouter = new Router()
  .post("/", koaBody, validateRequestBody(userValidate), UserController.create.bind(UserController))
  .get("/paginage", validateQuery(paginageValidate), UserController.paginate.bind(UserController))
  .get("/:id", UserController.getOne.bind(UserController))
  .put("/:id", koaBody, UserController.update.bind(UserController))
  .delete("/:id", UserController.delete.bind(UserController))
  .get("/addmock/users", addMockUsers);
