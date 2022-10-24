import { Context } from "koa";
import UserController from "../controllers/user_controller";

export async function router(ctx: Context, next: () => Promise<any>) {
    const path = ctx.url.split('/');
    if (path.length < 3) {
        if (ctx.request.method === 'POST') {
            await UserController.create(ctx);
        } else if (path[1] && ctx.request.method === 'GET') {
            await UserController.getOne(ctx);
        } else if (path[1] && ctx.request.method === 'PUT') {
            await UserController.update(ctx);
        } else if (path[1] && ctx.request.method === 'DELETE') {
            await UserController.delete(ctx);
        } 
    }
    await next();
}