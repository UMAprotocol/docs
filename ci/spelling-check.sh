#!/bin/bash

set -o errexit
set -o nounset

cd docs/
folders_array=($(echo */))

doc_folders_array=( "${folders_array[@]/%/*}" )

for folder in "${doc_folders_array[@]}"
  do
    mdspell \
    --report \
    --ignore-numbers \
    --ignore-acronyms \
    --dictionary dictionary \
    --en-us ${folder}
done
