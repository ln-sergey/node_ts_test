rm -rf gen
mkdir -p gen

$4 \
    -I=$7 \
    --plugin=protoc-gen-ts=$5 \
    --plugin=protoc-gen-grpc=$6 \
    --js_out=import_style=commonjs:$1 \
    --grpc_out=grpc_js:$1 \
    --ts_out=grpc_js:$2 \
    "$3"/*.proto
