import objectHash from "object-hash";
import { Context } from "koa";
import { Collection, Db, FindOneAndUpdateOptions, WithId } from "mongodb";
import { NotFoundError } from "../errors";
import { IUser } from "../schemas/user.schema";

class UserController {
  private static COLLECTION_NAME = "users";

  static async create(ctx: Context) {
    const id = objectHash(ctx.request.body as IUser);
    const model = {
      _id: id,
      ...(ctx.request.body as IUser),
    };
    await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .insertOne(model as object);
    ctx.body = JSON.stringify(model);
    ctx.status = 200;
  }

  static async getOne(ctx: Context) {
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

  static async paginate(ctx: Context) {
    const { limit, offset, status } = ctx.query;
    const usersCount = await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .count(status ? { status } : {});
    const users = await (ctx.db as Db)
      .collection(this.COLLECTION_NAME)
      .find(status ? { status } : {})
      .skip(Number(offset))
      .limit(Number(limit))
      .toArray();
    ctx.status = 200;
    ctx.body = JSON.stringify({ total: usersCount, items: users });
  }

  static async update(ctx: Context) {
    const result = await (
      (ctx.db as Db).collection(this.COLLECTION_NAME) as Collection<
        WithId<IUser>
      >
    ).findOneAndUpdate(
      { _id: ctx.params.id },
      { $set: ctx.request.body as IUser },
      { returnDocument: "after" } as FindOneAndUpdateOptions
    );
    if (!result) {
      throw new NotFoundError("account_not_found");
    } else {
      ctx.status = 200;
      ctx.body = JSON.stringify(result.value);
    }
  }

  static async delete(ctx: Context) {
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

export default UserController;
