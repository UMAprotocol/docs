#!/bin/bash

set -o errexit
set -o nounset

echo "installing required tools..."
yarn install
npm install -g solidity-docgen

# echo "installing protocol repo..."
git clone http://github.com/umaprotocol/protocol/ --single-branch || echo "Repo already exists"
yarn install --cwd protocol/packages/core --ignore-scripts

# echo "building contracts..."
# yarn --cwd protocol/packages/core/ hardhat compile

echo "generating docs files..."
rm -rf docs/contracts protocol/temp-docs

cd protocol/ && solidity-docgen --solc-module solc-0.8 -i packages/core/contracts/ -t ../ci/ -o temp-docs/

echo "configuring docs..."
mv temp-docs/ ../docs/contracts
