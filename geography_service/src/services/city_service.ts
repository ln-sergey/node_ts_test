import objectHash from "object-hash";
import { Collection, Db, WithId } from "mongodb";
import { ICity } from "../models/city";
import { NotFoundError } from "../errors";

class CityService {
  private collection: Collection<ICity & { _id: string }>;

  constructor(db: Db) {
    this.collection = db.collection<ICity & { _id: string }>(
      process.env.COLLECTION_NAME ?? "cities"
    );
  }

  async add(city: ICity) {
    const _id = objectHash(city);
    await this.collection.insertOne({
      _id,
      ...city,
    });
    return { _id };
  }

  async verify(city: ICity) {
    const result = await this.collection.findOne({ _id: objectHash(city) });
    if (!result) {
      throw new NotFoundError("invalid_city");
    } else {
      return {};
    }
  }
}

export default CityService;
