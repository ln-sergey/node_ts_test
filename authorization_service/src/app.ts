import Koa from "koa";
import { authorizationRouter } from "./middlewares/authorizationRouter";
import { DataBase } from "./schemas";
import { MongoClient } from "mongodb";
import { errorHandler } from "./middlewares/error_handler";

import { Kafka } from "kafkajs";
import AuthenticationController from "./controllers/authentication_controller";
import { IIdentity } from "./schemas/identity.schema";

const PORT: number = +(process.env.PORT ?? 3001);

const app = new Koa();

DataBase.connect()
  .then((mongoClient: MongoClient) => {
    app.context.db = mongoClient.db(process.env.DB_NAME);

    app.use(errorHandler);
    app.use(authorizationRouter.routes());
    app.use(authorizationRouter.allowedMethods());

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error(err);
    app.context.db.close();
    process.exit(1);
  });

const kafka = new Kafka({
  clientId: "users_service",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "my-group" });

consumer
  .connect()
  .then(() => {
    return consumer.subscribe({ topic: "users", fromBeginning: true });
  })
  .then(() => {
    const authenticationController = new AuthenticationController(
      app.context.db
    );
    return consumer.run({
      eachMessage: async ({ message }) => {
        const result = JSON.parse(message.value?.toString() ?? "{}");
        if (result.event === "CREATE") {
          await authenticationController.create(result.data);
        } else if (result.event === "UPDATE") {
          await authenticationController.update(result.data);
        } else if (result.event === "DELETE") {
          await authenticationController.delete(result.data);
        }
      },
    });
  });
