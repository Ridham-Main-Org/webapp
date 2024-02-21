#!/bin/bash

dnf module list postgresql
yes | sudo dnf module enable postgresql:16
yes | sudo dnf install postgresql-server

sudo postgresql-setup --initdb

sudo systemctl start postgresql
sudo systemctl enable postgresql

sudo -u postgres createdb UserDB
password="Timepass@1934"
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '$password';"

echo "Updating pg_hba.conf..."
# Replace "ident" with "md5" using sed
sudo sed -i 's/ident/md5/g' "/var/lib/pgsql/data/pg_hba.conf"
echo "Restarting PostgreSQL..."
sudo systemctl restart postgresql
echo "PostgreSQL restarted successfully."





# Change auth method from ident to md5

# Find the path to pg_hba.conf
# pg_hba_conf=$(sudo find /var/lib/pgsql -name pg_hba.conf)

# pg_hba_conf=$(echo "$pg_hba_conf" | xargs)
# pg_hba_conf="/var/lib/pgsql/data/pg_hba.conf"
