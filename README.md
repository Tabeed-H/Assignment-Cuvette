# Project Name

## Description

This project is a web application that provides job management functionalities, including job creation and sending job emails to candidates.

## Table of Contents

- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)

## Getting Started

To get started with this project, you'll need to set up both the backend and frontend components. Follow the steps below for each part of the application.

### Backend Setup

1. **Clone the Backend Repository**

   ```bash
   git clone https://github.com/Tabeed-H/Assignment-Cuvette/tree/main/Backend
   cd Backend
   ```

2. **Install Dependencies**
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root of the backend directory and add the necessary environment variables:

   ```plaintext
   URI=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   ROUNDS=<number-of-hash-rounds>
   TWILIO_ACCOUNT_SID=<your-twilio-account-sid>
   TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
   TWILIO_NUMBER=<your-twilio-number>
   EMAIL_ACCOUNT=<your-email-account>
   EMAIL_PASS=<your-email-password>
   ```

4. **Run the Backend Server**
   After setting up the environment variables, start the backend server:

   ```bash
   npm run start
   ```

   The backend server should now be running at `http://localhost:3000`.

### Frontend Setup

1. **Clone the Frontend Repository**

   ```bash
   git clone https://github.com/Tabeed-H/Assignment-Cuvette/tree/main/Frontend
   cd Frontend
   ```

2. **Install Dependencies**
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Run the Frontend Application**
   Start the frontend application:

   ```bash
   npm start
   ```

   The frontend should now be running at `http://localhost:3000`.

## Environment Variables

The following environment variables are used in the backend:

- `URI`: Connection string for your database.
- `JWT_SECRET`: Secret key used for signing JSON Web Tokens (JWT).
- `ROUNDS`: Number of hashing rounds for passwords.
- `TWILIO_ACCOUNT_SID`: Your Twilio account SID for SMS services.
- `TWILIO_AUTH_TOKEN`: Your Twilio authentication token.
- `TWILIO_NUMBER`: Your Twilio phone number for sending messages.
- `EMAIL_ACCOUNT`: Email account for sending job emails.
- `EMAIL_PASS`: Password for the email account.

Make sure to replace the placeholder values in your `.env` file with the actual values needed for your application.
