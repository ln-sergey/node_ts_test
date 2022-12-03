import { Context } from "koa";
import { IUser } from "../schemas/user.schema";
import { CityGRPCService } from "../services/city_grpc_service";

export async function validateCity(ctx: Context, next: () => Promise<any>) {
  const city = (ctx.request.body as IUser).city;
  console.log(`CIIIITY: ${city}`);
  if (city) {
    const result = await (
      ctx.cityGRPCService as CityGRPCService
    ).doVerifyCityCall({ city });
    console.log(`RESULT: ${result}`);
    if (result?.getError()) {
      ctx.status = 400;
      ctx.body = { error: result.getError() };
    } else {
      await next();
    }
  } else {
    await next();
  }
}
