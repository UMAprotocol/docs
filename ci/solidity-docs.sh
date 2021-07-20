#!/bin/bash

set -o errexit
set -o nounset

npm install solidity-docgen
git clone http://github.com/umaprotocol/protocol/
cd protocol
yarn
yarn qbuild
solidity-docgen --solc-module solc-0.8 -i packages/core/contracts/ -o ./temp-docs/
