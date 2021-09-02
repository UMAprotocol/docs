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

ovm_contract_folder="packages/core/contracts-ovm"
general_contracts_folder="packages/core/contracts-ovm/insured-bridge/"
solc07_folder="packages/core/solc0.7"
solc08_folder="packages/core/solc0.8"
solc07_files="${solc07_folder}/ovm-solc07_docs"
solc08_files="${solc08_folder}/ovm-solc08_docs"
output_docs_folder="temp-docs/"
template_folder="../ci/"

cd protocol/

mkdir ${solc07_folder} || echo "Folder already exists"
mkdir ${solc08_folder} || echo "Folder already exists"

cp -R ${general_contracts_folder} ${solc07_folder}
cp -R ${general_contracts_folder} ${solc08_folder}

grep -r -l -i --include="*.sol" "solidity >=0.7.6" ${solc08_folder} > ${solc08_files}
grep -r -l -i --include="*.sol" "solidity ^0.8.0" ${solc07_folder} > ${solc07_files}

contract_ovm_08_array=(`cat "$solc08_files"`)
 for contract in "${contract_ovm_08_array[@]}"
  do
    rm -rf ${contract}
  done

contract_ovm_07_array=(`cat "$solc07_files"`)
 for contract in "${contract_ovm_07_array[@]}"
  do
    rm -rf ${contract}
  done

echo "generating docs for general contrats using solc-0.8"
solidity-docgen --solc-module solc-0.8 -i ${general_contracts_folder} -t ${template_folder} -o ${output_docs_folder}

mv "${ovm_contract_folder}" "${ovm_contract_folder}_original/"
mv ${solc08_folder} ${ovm_contract_folder}

echo "generating docs for ovm contrats using solc-0.8"
solidity-docgen --solc-module solc-0.8 -i ${solc08_folder} -t ${template_folder} -o ${output_docs_folder} || continue

rm -rf ${ovm_contract_folder}
mv ${solc07_folder} ${ovm_contract_folder}

echo "generating docs for ovm contrats using solc-0.7"
solidity-docgen --solc-module solc-0.7 -i ${solc07_folder} -t ${template_folder} -o ${output_docs_folder} || continue

echo "configuring docs..."
mv temp-docs/ ../docs/contracts
