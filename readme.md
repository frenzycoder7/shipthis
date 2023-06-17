## PROJECT SETUP
### 1. Install Node.js
### 2. Install MongoDB
### 3. Install npm 
### 4. Install Redis Server

## CLONE PROJECT
```bash
git clone https://github.com/frenzycoder7/shipthis.git
```

## INSTALL DEPENDENCIES
For Fletnix Client. You have to navigate to fletnix folder and run the following command.
```bash
npm install
```
For Fletnix Server. You have to navigate to server folder and run the following command.
```bash
npm install
```

## SETUP .ENV FILE
You only have to setup the .env file in the server folder. You have to create .env in server folder. Then you have to setup the following variables.
```bash
PORT=YOUR_PRODUCTION_PORT
TEST_PORT=YOUR_TEST_PORT
TEST_DATABASE=YOUR_TEST_DATABASE_URL
DATABASE=YOUR_PRODUCTION_DATABASE_URL
KEY=YOUR_JWT_SECRET_KEY
```
**NOTE**
TEST_PORT and TEST_DATABASE are only for testing purposes. You can leave them blank if you don't want to test the project.
Make sure that your redis server is running on port 6379 and mongodb is running on port 27017.
Redis server should not have any password. If you have password then you have to setup the password in connection.ts file in src/database folder.

## RUN PROJECT
For Fletnix Client. You have to navigate to fletnix folder and run the following command.
```bash
npm start
```
For Fletnix Server. You have to navigate to server folder and run the following command.
```bash
npm start
```
**NOTE**
If you run server folder using npm start this build the project and then run the project (Only for production use). If you want to run the project without building then you have to run the following command.
```bash
npm run dev
```
Make sure that server endpoint is correct in fletnix/src/services/apiService.tsx file. If you are running the server on localhost then you have to change value of baseurl by the local ip. If you are running the server on different port then you have to change the port in apiService.tsx file.