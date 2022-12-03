import { Context } from "koa";
import passport from "../libs/passport";

export async function authenticate(ctx: Context, next: () => Promise<any>) {
  await passport.authenticate("jwt", async function (err, user, info) {
    ctx.body = { user };
  })(ctx, next);
}
