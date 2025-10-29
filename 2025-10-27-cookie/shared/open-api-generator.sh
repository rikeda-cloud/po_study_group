#!/bin/bash
# OpenAPIからTypeScript型を生成するスクリプト
# usage: ./open-api-generator.sh [yamlファイルパス] [出力先ディレクトリ]

set -e

SCRIPT_DIR=$(cd $(dirname "$0"); pwd)
REPO_ROOT=$(cd "$SCRIPT_DIR/.."; pwd)

YAML_FILE=${1:-$REPO_ROOT/docs/step1.yaml}
OUTPUT_DIR=${2:-$REPO_ROOT/shared/api-types}

npx openapi-generator-cli generate \
  -i "$YAML_FILE" \
  -g typescript-fetch \
  -o "$OUTPUT_DIR" \
  --additional-properties=supportsES6=true,modelPropertyNaming=original,typescriptThreePlus=true
