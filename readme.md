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