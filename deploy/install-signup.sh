#!/bin/bash
## Installs signup services in correct order
## Usage: ./install.sh [kubeconfig]

if [ $# -ge 1 ] ; then
  export KUBECONFIG=$1
fi

ROOT_DIR=`pwd`

function installing_signup() {

  helm repo add mosip https://mosip.github.io/mosip-helm
  # List of modules to install
  declare -a modules=("signup-service" "signup-ui")

  echo "Installing signup services"

  # Install modules
  for module in "${modules[@]}"
  do
    cd $ROOT_DIR/"$module"
    ./install.sh
  done

  echo "All signup services deployed successfully."
  return 0
}

# Set commands for error handling.
set -e
set -o errexit   ## set -e : exit the script if any statement returns a non-true return value
set -o nounset   ## set -u : exit the script if you try to use an uninitialized variable
set -o errtrace  # trace ERR through 'time command' and other functions
set -o pipefail  # trace ERR through pipes
installing_signup   # calling function
