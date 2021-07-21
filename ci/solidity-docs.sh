#!/bin/bash

set -o errexit
set -o nounset

#Check versions
uname -a
npm -v
node -v

npm install solidity-docgen
npm install rsync

git clone http://github.com/umaprotocol/protocol/
cd protocol
yarn
yarn qbuild
solidity-docgen --solc-module solc-0.8 -i packages/core/contracts/ -o ../temp-docs/
