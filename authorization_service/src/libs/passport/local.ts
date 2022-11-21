import { Context } from "koa";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "..";
import { generateToken } from "./jwt";

export const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "code",
  },
  async function (email, code, done) {
    try {
      const user = await Identity.findOne({ email, code });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
);

export const localAuthHandler = (ctx: Context, next: () => Promise<any>) => {
  return passport.authenticate("local", async (err, user) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = { error: "unauthorized" };
    } else {
      try {
        const { accessToken } = await generateToken({ user }, "secret");
        ctx.body = {
          accessToken,
        };
      } catch (e) {
        ctx.status = 500;
        ctx.body = { error: e };
      }
    }
  })(ctx, next);
};
