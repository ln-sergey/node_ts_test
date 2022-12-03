import { Context } from "koa";
import AuthenticationController from "../controllers/authentication_controller";
import { NotFoundError } from "../errors";
import { generateToken } from "../jwt";
import { IAuthenticate } from "../schemas/authenticate.schema";

export async function authenticate(ctx: Context, next: () => Promise<any>) {
  const authentication = ctx.request.body as IAuthenticate;
  try {
    const identity = await (
      ctx.authenticationController as AuthenticationController
    ).getOne(authentication.email, authentication.code);
    const token = await generateToken({ status: identity.status }, "secret");
    
    ctx.status = 200;
    ctx.body = token;
  } catch (error) {
    if (error instanceof NotFoundError) {
      ctx.status = 401;
      ctx.body = error.message;
    }
  }
}
