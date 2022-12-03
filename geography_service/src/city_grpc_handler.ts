import {
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerErrorResponse,
  ServerUnaryCall,
} from "@grpc/grpc-js";
import { CityService as CityServiceDef } from "./gen/cityapis/city_service_grpc_pb";
import {
  VerifyCityRequest,
  VerifyCityResponse,
} from "./gen/cityapis/city_service_pb";
import { NotFoundError } from "./errors";
import CityService from "./services/city_service";

export class CityGRPCHandler {
  private constructor(private readonly server: Server) {
    this.server = server;
  }

  static async instance(host: string, cityService: CityService) {
    const server = new Server();
    server.addService(CityServiceDef, {
      verifyCityCall(
        call: ServerUnaryCall<VerifyCityRequest, VerifyCityResponse>,
        callback: sendUnaryData<VerifyCityResponse>
      ) {
        const serverMessage = new VerifyCityResponse();
        cityService
          .verify({ name: call.request.getCity() })
          .then((value) => callback(null, serverMessage))
          .catch((err) => {
            if (err instanceof NotFoundError) {
              serverMessage.setError(err.message);
              callback(null, serverMessage);
            } else {
              callback(new Error("undefiend_rpc_error"), null);
            }
          });
      },
    });
    await new Promise<void>((resolve, reject) => {
      server.bindAsync(
        host,
        ServerCredentials.createInsecure(),
        (err: Error | null, port: number) => {
          if (err) {
            reject(err);
          } else {
            server.start();
            console.log(`Server bound on port: ${port}`);
            resolve();
          }
        }
      );
    });
    return new this(server);
  }
}
