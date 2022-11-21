import { Kafka, Producer } from "kafkajs";
import { Context } from "koa";
import { WithId } from "mongodb";
import { IUser } from "../schemas/user.schema";


class AuthorizationController {
  private producer_: Producer;
  private topicName_ = "users";
  private connected_ = false;

  constructor() {
    const kafka = new Kafka({
      clientId: "users_service",
      brokers: ["kafka:9092"],
    });
    this.producer_ = kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000
  });
  }

  private async send(event: string, id: string, ctx: Context) {
    if (!this.connected_) {
      await this.producer_.connect();
      this.connected_ = true;
    }
    await this.producer_.send({
      topic: this.topicName_,
      messages: [
        {
          key: id,
          value: JSON.stringify({ event, data: ctx.body }),
        },
      ],
    });
  }

  async sendCreate(ctx: Context) {
    this.send("CREATE", (ctx.body as WithId<IUser>)._id.toString(), ctx);
  }

  async sendUpdate(ctx: Context) {
    this.send("UPDATE", ctx.params.id, ctx);
  }

  async sendDelete(ctx: Context) {
    this.send("DELETE", ctx.params.id, ctx);
  }

  async connect() {
    await this.producer_.connect();
  }

  async disconnect() {
    await this.producer_.disconnect();
  }
}

export const authorizationController = new AuthorizationController();

