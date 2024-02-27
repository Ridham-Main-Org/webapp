#!/bin/bash

# Navigate to the directory where your Node.js application is located
cd /opt
yes | sudo dnf install unzip
yes | sudo unzip -o my-webapp-copy.zip

echo "Contents of /opt after unzipping:"
ls -l /opt

# # Create the .env file with the specified contents
# sudo tee .env > /dev/null <<EOF
# DB_USER="postgres"
# DB_HOST="localhost"
# DB_NAME="UserDB"
# DB_PASSWORD="Timepass@1934"
# DB_PORT=5432
# EOF

# # Echo the contents of the .env file
# echo "Contents of .env file:"
# cat .env

# Install dependencies using npm
sudo dnf module list nodejs
yes | sudo dnf module enable nodejs:20
yes | sudo dnf install nodejs

sudo npm install

