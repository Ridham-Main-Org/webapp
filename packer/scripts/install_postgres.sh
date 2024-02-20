#!/bin/bash

dnf module list postgresql
yes | sudo dnf module enable postgresql:16
yes | sudo dnf install postgresql-server

sudo postgresql-setup --initdb

sudo systemctl start postgresql
sudo systemctl enable postgresql

sudo -u postgres createdb UserDB
# sudo -u postgres psql

password="Timepass@1934"

sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '$password';"