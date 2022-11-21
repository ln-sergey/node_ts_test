import { Context } from "koa";
import { NotFoundError, ClientError } from "../errors";

export async function errorHandler(ctx: Context, next: () => Promise<any>) {
    try {
        await next();
    } catch (error) {
        if (error instanceof NotFoundError) {
            ctx.status = 404;
            ctx.body = JSON.stringify({ error: error.message });
        } else if (error instanceof ClientError) {
            ctx.status = 400;
            ctx.body = JSON.stringify({ error: error.message });
        } else if (error instanceof Error) {
            ctx.status = 500;
            ctx.body = JSON.stringify({ error: error.message });
        } else {
            ctx.status = 500;
            ctx.body = JSON.stringify({ error: 'unknown_error' });
        }
    }
}