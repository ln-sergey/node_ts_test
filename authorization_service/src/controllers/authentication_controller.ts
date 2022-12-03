import { Collection, Db, WithId } from "mongodb";
import { NotFoundError } from "../errors";
import { IIdentity, IIdentityMessage } from "../schemas/identity.schema";

export class AuthenticationController {
  private collection: Collection<IIdentity>;

  constructor(db: Db) {
    this.collection = db.collection<IIdentity>(
      process.env.COLLECTION_NAME ?? "identities"
    );
    this.collection.createIndex({ email: 1, code: 1 }, { unique: true });
  }

  async create(message: IIdentityMessage) {
    return this.collection.insertOne({
      _id: message._id,
      email: message.email,
      status: message.status,
      code: AuthenticationController.generateCode(),
    });
  }

  async getOne(email: string, code: string): Promise<WithId<IIdentity>> {
    const user = await this.collection
      .findOne({ email, code });
    if (!user) {
      throw new NotFoundError("unauthorized");
    }
    return user;
  }

  async update(message: IIdentityMessage) {
    const result = await this.collection.findOneAndUpdate(
      { _id: message._id },
      { $set: { status: message.status } },
      { returnDocument: "after" }
    );
    if (!result) {
      throw new NotFoundError("identity_not_found");
    }
  }

  async delete(message: { _id: string }) {
    const result = await this.collection.deleteOne(message);
    if (!result.deletedCount) {
      throw new NotFoundError("identity_not_found");
    }
  }

  private static generateCode(): string {
    return Math.random().toString(36).slice(2, 10);
  }
}

export default AuthenticationController;
