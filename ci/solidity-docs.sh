#!/bin/bash

set -o errexit
set -o nounset

echo "installing required tools..."
yarn install
npm install -g solidity-docgen

echo "installing protocol repo..."
git clone http://github.com/umaprotocol/protocol/ --single-branch || echo "Repo already exists"
yarn install --cwd protocol/packages/core --ignore-scripts

echo "generating docs files..."
filename=solc07_docs
cd protocol/

grep -r -l -i --include="*.sol" "solidity >=0.7.6" packages/core/contracts-ovm > ${filename}

mkdir ovm_docs
docs_ovm_array=(`cat "$filename"`)

 for doc in "${docs_ovm_array[@]}"
  do
    cp ${doc} ovm_docs/
  done

solidity-docgen --solc-module solc-0.8 -i packages/core/contracts/ -t ../ci/ -o temp-docs/
solidity-docgen --solc-module solc-0.7 -i ovm-docs/ -t ../ci/ -o temp-docs/

echo "configuring docs..."
mv temp-docs/ ../docs/contracts
