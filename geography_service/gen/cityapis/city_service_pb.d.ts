// package: cityapis
// file: cityapis/city_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class VerifyCityRequest extends jspb.Message { 
    getCity(): string;
    setCity(value: string): VerifyCityRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VerifyCityRequest.AsObject;
    static toObject(includeInstance: boolean, msg: VerifyCityRequest): VerifyCityRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VerifyCityRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VerifyCityRequest;
    static deserializeBinaryFromReader(message: VerifyCityRequest, reader: jspb.BinaryReader): VerifyCityRequest;
}

export namespace VerifyCityRequest {
    export type AsObject = {
        city: string,
    }
}

export class VerifyCityResponse extends jspb.Message { 
    getError(): string;
    setError(value: string): VerifyCityResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VerifyCityResponse.AsObject;
    static toObject(includeInstance: boolean, msg: VerifyCityResponse): VerifyCityResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VerifyCityResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VerifyCityResponse;
    static deserializeBinaryFromReader(message: VerifyCityResponse, reader: jspb.BinaryReader): VerifyCityResponse;
}

export namespace VerifyCityResponse {
    export type AsObject = {
        error: string,
    }
}
