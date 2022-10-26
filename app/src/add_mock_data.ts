import { Context } from "koa";
import { Db, OptionalId } from "mongodb";
import objectHash from "object-hash";
import { IUser } from "./schemas/user.schema";

export async function addMockUsers(ctx: Context, next: () => Promise<void>) {
  const users = [];
  const cities = ["Moscow", "New York", "London", "Paris", "Berlin"];
  const statuses = ["premium", "regular"];
  for (let i = 0; i < 700000; i++) {
    const random = Math.random();
    const user: IUser = {
      name: `user${i}`,
      email: `user${i}@mail.com`,
      city: cities[Math.floor(random * cities.length)],
      status: statuses[Math.floor(random * statuses.length)],
    };
    users.push({ ...user, _id: objectHash(user) });
  }
  await (ctx.db as Db).collection("users").insertMany(users as object[]);
  ctx.body = JSON.stringify({ ok: true });
  ctx.status = 200;
  await next();
}
