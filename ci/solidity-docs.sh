#!/bin/bash

set -o errexit
set -o nounset


#
# echo "installing required tools..."
# yarn install
# npm install -g solidity-docgen
#
# echo "installing protocol repo..."
git clone http://github.com/umaprotocol/protocol/ --single-branch || echo "Repo already exists"
yarn install --cwd protocol/packages/core --ignore-scripts

echo "generating docs files..."
cd protocol/

grep -r -l -i --include="*.sol" "solidity >=0.7.6" packages/core/contracts-ovm > ovm_docs

#docs_ovm_array=()
sudo apt-get install libc++-dev
mapfile -t docs_ovm_array < ovm_docs
echo "docs:"
echo $docs_ovm_array

#
# for doc in "${docs_ovm_array[@]}"
#   do
#     cp $doc ovm-docs/$doc
#   done
#
# solidity-docgen --solc-module solc-0.8 -i packages/core/contracts/ -t ../ci/ -o temp-docs/
# solidity-docgen --solc-module solc-0.7 -i ovm-docs/ -t ../ci/ -o temp-docs/
#
# echo "configuring docs..."
# mv temp-docs/ ../docs/contracts
