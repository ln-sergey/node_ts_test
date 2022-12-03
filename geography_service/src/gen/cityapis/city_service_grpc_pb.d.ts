// package: cityapis
// file: cityapis/city_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as cityapis_city_service_pb from "./city_service_pb";

interface ICityService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    verifyCityCall: ICityService_IverifyCityCall;
}

interface ICityService_IverifyCityCall extends grpc.MethodDefinition<cityapis_city_service_pb.VerifyCityRequest, cityapis_city_service_pb.VerifyCityResponse> {
    path: "/cityapis.City/verifyCityCall";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cityapis_city_service_pb.VerifyCityRequest>;
    requestDeserialize: grpc.deserialize<cityapis_city_service_pb.VerifyCityRequest>;
    responseSerialize: grpc.serialize<cityapis_city_service_pb.VerifyCityResponse>;
    responseDeserialize: grpc.deserialize<cityapis_city_service_pb.VerifyCityResponse>;
}

export const CityService: ICityService;

export interface ICityServer extends grpc.UntypedServiceImplementation {
    verifyCityCall: grpc.handleUnaryCall<cityapis_city_service_pb.VerifyCityRequest, cityapis_city_service_pb.VerifyCityResponse>;
}

export interface ICityClient {
    verifyCityCall(request: cityapis_city_service_pb.VerifyCityRequest, callback: (error: grpc.ServiceError | null, response: cityapis_city_service_pb.VerifyCityResponse) => void): grpc.ClientUnaryCall;
    verifyCityCall(request: cityapis_city_service_pb.VerifyCityRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cityapis_city_service_pb.VerifyCityResponse) => void): grpc.ClientUnaryCall;
    verifyCityCall(request: cityapis_city_service_pb.VerifyCityRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cityapis_city_service_pb.VerifyCityResponse) => void): grpc.ClientUnaryCall;
}

export class CityClient extends grpc.Client implements ICityClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public verifyCityCall(request: cityapis_city_service_pb.VerifyCityRequest, callback: (error: grpc.ServiceError | null, response: cityapis_city_service_pb.VerifyCityResponse) => void): grpc.ClientUnaryCall;
    public verifyCityCall(request: cityapis_city_service_pb.VerifyCityRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cityapis_city_service_pb.VerifyCityResponse) => void): grpc.ClientUnaryCall;
    public verifyCityCall(request: cityapis_city_service_pb.VerifyCityRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cityapis_city_service_pb.VerifyCityResponse) => void): grpc.ClientUnaryCall;
}
