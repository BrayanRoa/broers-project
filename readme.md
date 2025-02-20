# Node.js Project with Docker and Prisma ORM

This project is a basic setup of a development environment using Node.js, Docker, and Prisma. Follow the steps below to set up and run the project.

## Table of Contents

- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Docker Container](#running-the-docker-container)
- [Prisma ORM Configuration](#prisma-orm-configuration)
- [Prisma Commands](#prisma-commands)

## Installation

### 1. Install Node.js Modules

Run the following command to install the necessary modules:

```sh
npm install
```

### 2 Environment Setup
Clone the .env.template file and copy all the data into a new file called .env.

### 3. Running the Docker Container
Run the following command to start the Docker container:
```sh 
docker compose up -d
```

### 4. Prisma ORM Configuration
Execute the following commands to initialize and migrate Prisma. Run the second command only if you want to create the tables from the prisma.schema file:

```sh
npx prisma init --datasource-provider postgresql
```

```sh
npx prisma migrate dev --name init
```

### 5. operating system

if you have Linux installed you must use this script in your package.json

```
"dev": "NODE_ENV=development tsnd --respawn --clear src/app.ts",
"start": "set NODE_ENV=production&&npm run build && node dist/app.js",
```

if you have Windows installed you must use this script in your package.json
```
"dev": "NODE_ENV=development tsnd --respawn --clear src/app.ts",
"start": "set NODE_ENV=production&&npm run build && node dist/app.js",
```