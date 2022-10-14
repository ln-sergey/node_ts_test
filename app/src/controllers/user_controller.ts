import { Context } from "koa";
import { Db, MongoClient } from "mongodb";
import { ClientError, NotFoundError } from "../errors";
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
        const id = ctx.req.url?.split('/')[1];
        const user = await (ctx.db as Db)
            .collection(this.COLLECTION_NAME)
            .findOne({ _id: id });
        if (!user) {
            throw new NotFoundError('account_not_found');
        } else {
            ctx.status = 200;
            ctx.body = JSON.stringify(user);
        }
    }
    async update(ctx: Context) {
        const id = ctx.req.url?.split('/')[1];
        const result = await (ctx.db as Db)
            .collection(this.COLLECTION_NAME)
            .updateOne({ _id: id }, { $set: ctx.body });
        if (!result.matchedCount) {
            throw new NotFoundError('account_not_found');
        } else {
            const user = await (ctx.db as Db)
                .collection(this.COLLECTION_NAME)
                .findOne({ _id: id });
            ctx.status = 200;
            ctx.body = JSON.stringify(user);
        }
    }
    async delete(ctx: Context) {
        const id = ctx.req.url?.split('/')[1];
        const result = await (ctx.db as Db)
            .collection(this.COLLECTION_NAME)
            .deleteOne({ _id: id });
        if (!result.deletedCount) {
            throw new NotFoundError('account_not_found');
        } else {
            ctx.status = 200;
            ctx.body = JSON.stringify({ _id: id });
        }
    }
}

export default new UserController();