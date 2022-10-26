import objectHash from "object-hash";
import { Context } from "koa";
import { Collection, Db, FindOneAndUpdateOptions, UpdateFilter, WithId } from "mongodb";
import { NotFoundError } from "../errors";
import { IUser } from "../schemas/user.schema";

class UserController {
  private COLLECTION_NAME = "users";

  async create(ctx: Context) {
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
  }

  async getOne(ctx: Context) {
    const user = await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .findOne({ _id: ctx.params.id });
    if (!user) {
      throw new NotFoundError("account_not_found");
    } else {
      ctx.status = 200;
      ctx.body = JSON.stringify(user);
    }
  }

  async paginate(ctx: Context) {
    const { limit, offset, status } = ctx.query;
    const users = await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .find(status ? { status } : {})
      .skip(Number(offset))
      .limit(Number(limit))
      .toArray();
    ctx.status = 200;
    ctx.body = JSON.stringify(users);
  }

  async update(ctx: Context) {
    const result = await ((ctx.db as Db)
      .collection(this.COLLECTION_NAME) as Collection<WithId<IUser>>)
      .findOneAndUpdate(
        { _id: ctx.params.id },
        { $set: ctx.body as IUser },
        { returnNewDocument: "after" } as FindOneAndUpdateOptions
      );
    if (!result) {
      throw new NotFoundError("account_not_found");
    } else {
      ctx.status = 200;
      ctx.body = JSON.stringify(result);
    }
  }

  async delete(ctx: Context) {
    const result = await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .deleteOne({ _id: ctx.params.id });
    if (!result.deletedCount) {
      throw new NotFoundError("account_not_found");
    } else {
      ctx.status = 200;
      ctx.body = JSON.stringify({ _id: ctx.params.id });
    }
  }
}

export default new UserController();
