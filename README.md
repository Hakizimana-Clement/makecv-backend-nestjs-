# MAKE CV SERVER

This NESTJS API enables users to sign up and sign in to Make your CV, a platform that simplifies the process of creating it.

- REST API with Prisma (TypeScript ORM support)
- Folder structure and best practices
<!-- - Swagger documentation, Joi validation, Winston logger, ... -->

## Table of contents

- [Installation](#installation)
- [Overview](#overview)
  - [The task](#the-task)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Challenges](#challenges)
- [Acknowledgments](#acknowledgments)

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM.
- A database like MongoDB install localy because we gonna use MongoDB replication which is is the process of creating a copy of the same data set in more than one MongoDB server.

### 1.2 Project configuration

1. Start by cloning this project on your workstation.

```bash
git clone https://github.com/Hakizimana-Clement/makecv-backend-nestjs-.git
```

2. The next thing will be to install all the dependencies of the project. 2. Navigate to the project directory: _"cd makecv-backend-nestjs-"_

```bash
cd makecv-backend-nestjs-  && npm install
```

3. Once the dependencies are installed, you can now configure your project by creating a new `.env ` file containing your environment variables used for development. You can you `.env.example` to see how you're .env can be structured.

```bash
start .env.example

```

4. start by creating your mongo replication using this [video](#https://www.youtube.com/watch?v=91PCBRJxkh0) or following these steps:

4.1. Create two folder

```bash
mkdir data1 data2
```

4.2. In first data1 create these three folder "config, db and log"

```bash
cd data1 && mkdir db config log
```

And also do to the data2 folder

```bash
cd data2 && mkdir db config log
```

4.3. In data1 folder, create file called "mongod.cnf", which have dbpath,logpath and port of your replicate.

```bash
cd data1 && cd config && touch mongod.cnf
```

Write this but fell free to change it.

```txt
dbpath=d:\data1\db
logpath=d:\data1\log\mongod.log
port=27020
```

And save it.

4.4. To config the data2 is the same as how to config data1 except "mongod.cnf".

```txt
dbpath=d:\data2\db
logpath=d:\data2\log\mongod.log
port=27030
```

4.5. run them like this:
<br>

- Start with first primary mongo

<br>
code template

```bash
 mongod --dbpath "" --logpath "" --port  --storageEngine=wiredTiger --journal --replSet nameofthereplica
```

<br>
code sample
```bash
mongod --dbpath "C:\Program Files\MongoDB\Server\6.0\data" --logpath "C:\Program Files\MongoDB\Server\6.0\log\mongod.log" --port 27017 --storageEngine=wiredTiger --journal --replSet testrep
```

Open another terminal and type

```bash
mongo --port 27017
```

after to run mongo type this to config it.

```mongo
rsconf={_id:"testrep",members:[{_id:0,host:"localhost:27017"}]}
```

Details:

     - rsconf: the configuration document for the replica set.
     - \_id: "testrep": the name of the replica set.
     - members: [{_id: 0, host: "localhost:27017"}]: the list of members in the replica set, each with an identifier and a host address.

```mongo
rs.initiate(rsconf)
```

- run replicate database we create in data1 and data2 folder.

Create another terminal for data1
<br>
code template

```bash
 mongod --dbpath "" --logpath "" --port  --storageEngine=wiredTiger --journal --replSet nameofthereplica
```

code sample

```bash
mongod --dbpath "C:\data1\db" --logpath "C:\data1\log\mongod.log" --port 27020  --storageEngine=wiredTige
r --journal --replSet testrep
```

Create another terminal for data2
<br>
code template

```bash
 mongod --dbpath "" --logpath "" --port  --storageEngine=wiredTiger --journal --replSet nameofthereplica
```

code sample

```bash
mongod --dbpath "C:\data2\db" --logpath "C:\data2\log\mongod.log" --port 27030  --storageEngine=wiredTige
r --journal --replSet testrep
```

**TIPS:** to upgrade or downgrade replica to be primary or secondary use " rs.stepDown()"

```bash
rs.stepDown()
```

 <br>
If you get confuse during setting mongo replication by follwoing these steps, you can use this [video](#https://www.youtube.com/watch?v=91PCBRJxkh0)

5. And Create your .env file you can use env.example to see how to fill .env file.

```bash
touch .env
```

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├── auth/  # A module contain user auth
├── prisma/  # TypeORM migrations created using "npm run migration:create"
├── curriculum-vitae/  # TypeORM migrations created using "npm run migration:create"
├── curriculum-vitae/  # TypeORM migrations created using "npm run migration:create"
├── user/  # TypeORM migrations created using "npm run migration:create"
├── modules
│   ├── app.module.ts
│   ├── auth/  # The common module contains pipes, guards, service and provider used in the whole application for authentication

│   │   ├── decorator  # custom decorator
│   │   │     ├── get-user.decorator.ts
│   │   │     ├── index.ts
│   │   ├── dto
│   │   │     ├── auth.dto.ts
│   │   │     ├── index.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   ├── passenger/  # A module example that manages "passenger" resources
│   │   ├── controller/
│   │   │   └── passenger.controller.ts
│   │   ├── flow/  # The "flow" directory contains the pipes, interceptors and everything that may change the request or response flow
│   │   │   └── passenger.pipe.ts
│   │   ├── model/
│   │   │   ├── passenger.data.ts  # The model that will be returned in the response
│   │   │   ├── passenger.entity.ts  # The actual TypeORM entity
│   │   │   └── passenger.input.ts  # The model that is used in the request
│   │   ├── passenger.module.ts
│   │   ├── service/
│   │   │   └── passenger.service.ts
│   │   └── spec/
│   └── tokens.ts
└── server.ts
```

## 3. Running the app

### 3.1. app

```sh
# run in development mode
$ npm run start:dev

```

### 3.2. Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

### 3.3. Prisma

```bash
# Run to push the state from your Prisma schema to your database
npx prisma db push

# Run this to open database in browser
npx prisma studio
```

### 3.4. Swagger api

To run API document run port and add endpoint of _/api_

```http

http://localhost:3333/api
```
