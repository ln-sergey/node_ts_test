const {
    GRPC_HOST,
    GRPC_PORT
} = process.env;

export const grpcHost = `${GRPC_HOST}:${GRPC_PORT}`