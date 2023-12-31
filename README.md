Welcome to novarift repository

This is an app that wants to copy Netflix :D

# Project Explaination

## Postgres Database Structure
<img src="resources/database_schema.png" alt="drawing" width="400"/>

[DB Diagram Link](https://dbdiagram.io/d/657dbd8a56d8064ca026714e)


## Environment variables
The environement variables are located in the .env file (it is normally ignored by git), copy its content from the .env.example file.
 - DB_CONNECTION : Database type, the default one is postgres (pg)
 - PG_HOST : Database hostname
 - PG_PORT : Database port
 - PG_USER : Database user
 - PG_PASSWORD : Database password
 - PG_DB_NAME : Database name


 - IMAGE_HOSTNAME : Hostname from which accept serving images without a need for authentication (usefull if you have a next image optimization)


# Launching dev project

## Database
To start the postgres database, you should have Docker installed.
Then execute the following command in the project directory : 

```bash
docker compose up -d
```

## AdonisJS server
To start the api server, first install all the dependencies, and then launch the server : 
> You should have node installed
```bash
npm install
npm run dev
```

## Migrate the database
Then you should migrate the database with the following command, and optionally seed it with some development seeders : 
```bash
node ace migration:fresh
# And to seed it
node ace db:seed
```
