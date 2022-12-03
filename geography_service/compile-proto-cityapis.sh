OUT_DIR="./gen"
TS_OUT_DIR="./gen"
IN_DIR="./../cityapis"
PROTOC="$(npm bin)/grpc_tools_node_protoc"
PROTOC_GEN_TS_PATH="$(npm bin)/protoc-gen-ts"
PROTOC_GEN_GRPC_PATH="$(npm bin)/grpc_tools_node_protoc_plugin"
I="./../"

eval "./../scripts/compile-proto.sh $OUT_DIR $TS_OUT_DIR \
        $IN_DIR $PROTOC $PROTOC_GEN_TS_PATH $PROTOC_GEN_GRPC_PATH $I"
