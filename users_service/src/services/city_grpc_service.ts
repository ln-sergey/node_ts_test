import * as grpc from "@grpc/grpc-js";
import { CityClient } from "../gen/cityapis/city_service_grpc_pb";
import {
  VerifyCityRequest,
  VerifyCityResponse,
} from "../gen/cityapis/city_service_pb";

export class CityGRPCService {
  private constructor(private readonly client: CityClient) {
    this.client = client;
  }

  static async instance(host: string, timeout: number) {
    const client = new CityClient(host, grpc.credentials.createInsecure());
    await new Promise<void>((resolve, reject) => {
      const deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + timeout);
      client.waitForReady(deadline, (error?: Error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
    return new this(client);
  }

  async doVerifyCityCall(
    req: VerifyCityRequest.AsObject
  ): Promise<VerifyCityResponse | undefined> {
    return new Promise((resolve, reject) => {
      const clientMessage = new VerifyCityRequest();
      clientMessage.setCity(req.city);
      this.client.verifyCityCall(
        clientMessage,
        (
          error: grpc.ServiceError | null,
          serverMessage?: VerifyCityResponse
        ) => {
          console.log(`serverMessage: ${serverMessage?.getError()}`)
          if (error) {
            reject(error);
          }
          resolve(serverMessage);
        }
      );
    });
  }
}
