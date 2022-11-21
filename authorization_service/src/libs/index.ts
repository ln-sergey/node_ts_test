import passport from "koa-passport";
import { localStrategy } from "./passport/local";

passport.use(localStrategy);

export default passport;
