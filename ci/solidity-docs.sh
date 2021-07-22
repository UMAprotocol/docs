#!/bin/bash

set -o errexit
set -o nounset

echo "installing required tools..."
yarn install
npm install -g solidity-docgen

echo "installing protocol repo..."
git clone http://github.com/umaprotocol/protocol/
yarn --cwd protocol/

echo "building contracts..."
yarn --cwd protocol/packages/core/ hardhat compile

echo "generating docs files..."
solidity-docgen --solc-module solc-0.8 -i protocol/packages/core/contracts/ -o temp-docs/

echo "configuring docs..."
mv protocol/temp-docs/ ./docs/contracts
