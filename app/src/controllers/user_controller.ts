import { Context } from "koa";
import { Db } from "mongodb";
import { NotFoundError } from "../errors";
import { IUser, User } from "../models/user.model";

class UserController {
    private COLLECTION_NAME = 'users';

    async create(ctx: Context) {
        const user = new User(ctx.body as IUser)
        await (ctx.db as Db)
            .collection(this.COLLECTION_NAME)
            .insertOne(user.model);
        ctx.body = JSON.stringify(user.model);
        ctx.status = 200;
    }
    async getOne(ctx: Context) {
        const user = await (ctx.db as Db)
            .collection(this.COLLECTION_NAME)
            .findOne({ _id: ctx.params.id });
        if (!user) {
            throw new NotFoundError('account_not_found');
        } else {
            ctx.status = 200;
            ctx.body = JSON.stringify(user);
        }
    }
    async update(ctx: Context) {
        const result = await (ctx.db as Db)
            .collection(this.COLLECTION_NAME)
            .updateOne({ _id: ctx.params.id }, { $set: ctx.body });
        if (!result.matchedCount) {
            throw new NotFoundError('account_not_found');
        } else {
            const user = await (ctx.db as Db)
                .collection(this.COLLECTION_NAME)
                .findOne({ _id: ctx.params.id });
            ctx.status = 200;
            ctx.body = JSON.stringify(user);
        }
    }
    async delete(ctx: Context) {
        const result = await (ctx.db as Db)
            .collection(this.COLLECTION_NAME)
            .deleteOne({ _id: ctx.params.id });
        if (!result.deletedCount) {
            throw new NotFoundError('account_not_found');
        } else {
            ctx.status = 200;
            ctx.body = JSON.stringify({ _id: ctx.params.id });
        }
    }
}

export default new UserController();