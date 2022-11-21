import { Collection, Db } from "mongodb";
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
      city: message.city,
      code: AuthenticationController.generateCode(),
    });
  }

  async update(message: IIdentityMessage) {
    const result = await this.collection.findOneAndUpdate(
      { _id: message._id },
      { $set: { city: message.city } },
      { returnDocument: "after" }
    );
    if (!result) {
      throw new NotFoundError("account_not_found");
    }
  }

  async delete(id: string) {
    const result = await this.collection.deleteOne({ _id: id });
    if (!result.deletedCount) {
      throw new NotFoundError("account_not_found");
    }
  }

  private static generateCode(): string {
    return Math.random().toString(36).slice(2, 10);
  }
}

export default AuthenticationController;