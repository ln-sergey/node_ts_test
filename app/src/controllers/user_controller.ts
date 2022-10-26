import objectHash from "object-hash";
import { Context } from "koa";
import { Db, FindOneAndUpdateOptions, UpdateFilter } from "mongodb";
import { NotFoundError } from "../errors";
import { IUser } from "../schemas/user.schema";

class UserController {
  private COLLECTION_NAME = "users";

  async create(ctx: Context, next: () => Promise<void>) {
    const id = objectHash(ctx.body as IUser);
    const model = {
      _id: id,
      ...(ctx.body as IUser),
    };
    await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .insertOne(model as object);
    ctx.body = JSON.stringify(model);
    ctx.status = 200;
    await next();
  }

  async getOne(ctx: Context, next: () => Promise<void>) {
    const user = await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .findOne({ _id: ctx.params.id });
    if (!user) {
      throw new NotFoundError("account_not_found");
    } else {
      ctx.status = 200;
      ctx.body = JSON.stringify(user);
      await next();
    }
  }

  async paginate(ctx: Context, next: () => Promise<void>) {
    const { limit, offset, status } = ctx.query;
    const users = await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .find(status ? { status } : {})
      .skip(Number(offset))
      .limit(Number(limit))
      .toArray();
    ctx.status = 200;
    ctx.body = JSON.stringify(users);
    await next();
  }

  async update(ctx: Context, next: () => Promise<void>) {
    const result = await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: ctx.params.id },
        { $set: ctx.body as UpdateFilter<Document> },
        { returnNewDocument: true } as FindOneAndUpdateOptions
      );
    if (!result) {
      throw new NotFoundError("account_not_found");
    } else {
      ctx.status = 200;
      ctx.body = JSON.stringify(result);
      await next();
    }
  }

  async delete(ctx: Context, next: () => Promise<void>) {
    const result = await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .deleteOne({ _id: ctx.params.id });
    if (!result.deletedCount) {
      throw new NotFoundError("account_not_found");
    } else {
      ctx.status = 200;
      ctx.body = JSON.stringify({ _id: ctx.params.id });
      await next();
    }
  }
}

export default new UserController();
