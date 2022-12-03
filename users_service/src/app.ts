import Koa from "koa";
import { usersRouter } from "./middlewares/usersRouter";
import { DataBase } from "./schemas";
import { MongoClient } from "mongodb";
import { errorHandler } from "./middlewares/error_handler";
import { CityGRPCService } from "./services/city_grpc_service";
import { geographyHost } from "./config/grpc.config";

const PORT: number = +(process.env.PORT ?? 8080);

const app = new Koa();

DataBase.connect()
  .then(async (mongoClient: MongoClient) => {
    app.context.db = mongoClient.db(process.env.DB_NAME);
    app.context.db
      .collection(process.env.COLLECTION_NAME ?? "cities")
      .createIndex({ email: 1 }, { unique: true });

    app.use(errorHandler);
    app.use(usersRouter.routes());
    app.use(usersRouter.allowedMethods());

    app.listen(PORT, async () => {
      console.log(`Server is listening on port ${PORT}`);
      app.context.cityGRPCService = await CityGRPCService.instance(
        geographyHost,
        5
      );
      console.log('safdgsdgsd-----')
    });
  })
  .catch((err: Error) => {
    console.error(err);
    app.context.db.close();
    process.exit(1);
  });
