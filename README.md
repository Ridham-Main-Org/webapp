## webapp Instructions

### test235
- Clone the repository
- Go to the root of the project

### env variables
DB_USER ="postgres"
DB_HOST ="localhost"
DB_NAME ="UserDB"
DB_PASSWORD ="Timepass@1934"
DB_PORT= 5432

### install all dependencies
npm install

### start server
npm run dev


### Deployment instructions and commands
cat test1.pub


-Connect to server
ssh -i ./test1 root@<ip_address>
mkdir code

- Upload the zip file with the source code to the VM created by running the following command:
scp source_code.zip username@ip_address:destination_dir
scp -i ./test3 ~/Downloads/Ridham_Modh_002752204_02-2.zip root@<ip_address>:/root/code

- Unzip
sudo dnf install unzip
unzip Ridham_Modh_002752204__02-2.zip


- Install mysql
dnf module list postgresql
sudo dnf module enable postgresql:16
sudo dnf install postgresql-server

sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql

sudo -u postgres psql
sudo -u postgres createdb UserDB

- Check databases, current connection & Set password
\l
\conninfo
\password postgres



- Install Node.js
sudo dnf module list nodejs
sudo dnf module enable nodejs:20
sudo dnf install nodejs


- Make .env in code/my-webapp
touch .env
vi .env
Add
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=UserDB
DB_USER=postgres
DB_PASSWORD=Timepass@1934


- Change Ident to md5 
For that Go in root location

find /var/lib/pgsql -name pg_hba.conf
cp /var/lib/pgsql/data/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf.backup
sudo vi /var/lib/pgsql/data/pg_hba.conf
sudo systemctl restart postgresql


- Run Code
npm install
npm run dev


- See changes in DB, connect to UserDB
\c UserDB

Select * from users;
