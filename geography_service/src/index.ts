import Koa from "koa";
import { MongoClient } from "mongodb";
import passport from "./libs/passport";
import { url as mongoUrl } from "./conf/db.config";
import { grpcHost } from "./conf/grpc.config";
import { citiesRouter } from "./middlewares/citiesRouter";
import { errorHandler } from "./middlewares/error_handler";
import { CityGRPCHandler } from "./city_grpc_handler";
import CityService from "./services/city_service";

const PORT: number = +(process.env.PORT ?? 3003);

const app = new Koa();

new MongoClient(mongoUrl)
  .connect()
  .then(async (mongoClient: MongoClient) => {
    app.context.db = mongoClient.db(process.env.DB_NAME);
    app.context.cityService = new CityService(app.context.db);

    app.use(errorHandler);
    app.use(citiesRouter.routes());
    app.use(citiesRouter.allowedMethods());
    app.use(passport.initialize());

    await CityGRPCHandler.instance(grpcHost, app.context.cityService);
    console.log("RPC Server Started!");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error(err);
    app.context.db.close();
    process.exit(1);
  });
