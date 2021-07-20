#!/bin/bash

set -o errexit
set -o nounset

#Check versions
uname -a
npm -v
node -v

apt-get install rsync -y
npm install solidity-docgen

git clone http://github.com/umaprotocol/protocol/
cd protocol
yarn
yarn qbuild
solidity-docgen --solc-module solc-0.8 -i packages/core/contracts/ -o ./temp-docs/
