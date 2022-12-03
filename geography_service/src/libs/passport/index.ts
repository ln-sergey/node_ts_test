import passport from "koa-passport";
import { jwtStrategy } from "./strategies/jwt.strategy";

passport.use(jwtStrategy);

export default passport;
