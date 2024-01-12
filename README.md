<p align="center">
  <a href="https://ivorysoft.co/" target="blank"><img src="https://ivorysoft.co/logo/IvorysoftLogo.svg" width="200" alt="IvorySoft Logo" /></a>
</p>

  <p align="center">creativepropulsionlabs/node-test-task</p>
    <p align="center">
    
## Description

This project have realization of next functionality:
- Creating new user
- Receiving list of all users
- Receiving user details by id
- Swagger API Documentation on `/api-docs` endpoint
- OWASP Security Practices
  - Helmet
  - Request Content Size Limits ([json and urlencoded](src/common/middlewares) middlewares)
  - Strict input validation ([validation pipe](src/main.ts))
  - [All Exception / Sequelize Error Handler](src/common/filters/all-exception.filter.ts) 
- Sequelize ORM and User model for **PostgreSQL**
- AWS: Configured `buildspec.yml`, `Procfile`

## Requirements

This project based on NodeJS, but require additional technologies for launch and work.
Before launch project you need make sure that you have installed Postgres Database and create db with **user-db** name.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Authors - [Denis Dunaievskiy](https://github.com/Denver23)