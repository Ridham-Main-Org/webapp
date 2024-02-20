#!/bin/bash

# Navigate to the directory where your Node.js application is located
# cd "$1"

cd /opt
yes | sudo dnf install unzip
yes | sudo unzip my-webapp-copy.zip

cd my-webapp-copy

# Install dependencies using npm
sudo dnf module list nodejs
yes | sudo dnf module enable nodejs:20
yes | sudo dnf install nodejs

sudo npm install

