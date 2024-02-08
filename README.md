### webapp Instructions
- Clone the repository
- Go to the root of the project

# env variables
DB_USER ="postgres"
DB_HOST ="localhost"
DB_NAME ="UserDB"
DB_PASSWORD ="Timepass@1934"
DB_PORT= 5432

# install all dependencies
npm install

# start server
npm run dev


## Deployment instructions
- Upload the zip file with the source code to the VM created by running the following command:
scp source_code.zip username@ip_address:destination_dir

- Extract the zip folder in the respective directory on the VM:
unzip source_code.zip

- Install Node.js
sudo dnf module install nodejs:18

- Install PostgreSQL
sudo dnf install postgresql postgresql-contrib

- Initialize it:
sudo postgresql-setup --initdb