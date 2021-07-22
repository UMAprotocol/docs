#!/bin/bash

set -o errexit
set -o nounset

echo "installing required tools..."
npm install solidity-docgen

echo "installing protocol repo..."
git clone http://github.com/umaprotocol/protocol/
yarn
yarn --cwd protocol/

echo "building contracts..."
yarn --cwd protocol/packages/core/ hardhat compile

echo "generating docs files..."
cd protocol/
solidity-docgen --solc-module solc-0.8 -i packages/core/contracts/ -o temp-docs/

echo "configuring docs..."
cd ..
mv protocol/temp-docs/ ./docs/contracts

echo "building docs..."
npm run build
