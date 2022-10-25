import UserController from "../controllers/user_controller";
import Router from "koa-router";
import KoaBody from "koa-body";
import convert from "koa-convert";

const koaBody = convert(KoaBody());

export const usersRouter = new Router()
    .post("/", koaBody, UserController.create)
    .get("/:id", UserController.getOne)
    .put("/:id", koaBody, UserController.update)
    .delete("/:id", UserController.delete);