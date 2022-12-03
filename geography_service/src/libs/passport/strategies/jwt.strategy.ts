import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

export const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  return done(null, jwt_payload);
});
