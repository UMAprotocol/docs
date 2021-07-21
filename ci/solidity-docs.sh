#!/bin/bash

set -o errexit
set -o nounset

#Check versions
uname -a
npm -v
node -v

npm install solidity-docgen

echo "installing protocol repo..."
git clone http://github.com/umaprotocol/protocol/
cd protocol
yarn

echo "building contracts..."
yarn --cwd packages/core/ hardhat compile

echo "generating docs files..."
solidity-docgen --solc-module solc-0.8 -i packages/core/contracts/ -o ../temp-docs/
