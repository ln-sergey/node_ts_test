import Koa from "koa";
import { authorizationRouter } from "./middlewares/authorizationRouter";
import { DataBase } from "./schemas";
import { MongoClient } from "mongodb";
import { errorHandler } from "./middlewares/error_handler";
import { Kafka } from "kafkajs";
import AuthenticationController from "./controllers/authentication_controller";

const PORT: number = +(process.env.PORT ?? 3001);

const app = new Koa();

const kafka = new Kafka({
  clientId: "users_service",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "authorization_service" });

DataBase.connect()
  .then(async (mongoClient: MongoClient) => {
    app.context.db = mongoClient.db(process.env.DB_NAME);
    app.context.authenticationController = new AuthenticationController(
      app.context.db
    );

    app.use(errorHandler);
    app.use(authorizationRouter.routes());
    app.use(authorizationRouter.allowedMethods());

    await consumer.connect();
    await consumer.subscribe({ topic: "users" });
    consumer.run({
      eachMessage: async ({ message }) => {
        const messageParsed = JSON.parse(message.value?.toString() ?? "{}");
        if (messageParsed.event === "CREATE") {
          await app.context.authenticationController.create(messageParsed.data);
        } else if (messageParsed.event === "UPDATE") {
          await app.context.authenticationController.update(messageParsed.data);
        } else if (messageParsed.event === "DELETE") {
          await app.context.authenticationController.delete(messageParsed.data);
        }
      },
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error(err);
    app.context.db.close();
    process.exit(1);
  });
