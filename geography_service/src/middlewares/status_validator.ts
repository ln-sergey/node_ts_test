import { Context } from "koa";
import { ClientError } from "../errors";

export const validateStatus = (status: "premium" | "regular") => {
  return async function errorHandler(ctx: Context, next: () => Promise<any>) {
    if ((ctx.state.user as { status: string }).status != status) {
        throw new ClientError(`Not permitted for ${ctx.session.status} user`);
    }
    await next();
  };
}
