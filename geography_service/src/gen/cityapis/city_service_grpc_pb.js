// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var cityapis_city_service_pb = require('./city_service_pb.js');

function serialize_cityapis_VerifyCityRequest(arg) {
  if (!(arg instanceof cityapis_city_service_pb.VerifyCityRequest)) {
    throw new Error('Expected argument of type cityapis.VerifyCityRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cityapis_VerifyCityRequest(buffer_arg) {
  return cityapis_city_service_pb.VerifyCityRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cityapis_VerifyCityResponse(arg) {
  if (!(arg instanceof cityapis_city_service_pb.VerifyCityResponse)) {
    throw new Error('Expected argument of type cityapis.VerifyCityResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cityapis_VerifyCityResponse(buffer_arg) {
  return cityapis_city_service_pb.VerifyCityResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CityService = exports.CityService = {
  verifyCityCall: {
    path: '/cityapis.City/verifyCityCall',
    requestStream: false,
    responseStream: false,
    requestType: cityapis_city_service_pb.VerifyCityRequest,
    responseType: cityapis_city_service_pb.VerifyCityResponse,
    requestSerialize: serialize_cityapis_VerifyCityRequest,
    requestDeserialize: deserialize_cityapis_VerifyCityRequest,
    responseSerialize: serialize_cityapis_VerifyCityResponse,
    responseDeserialize: deserialize_cityapis_VerifyCityResponse,
  },
};

exports.CityClient = grpc.makeGenericClientConstructor(CityService);
