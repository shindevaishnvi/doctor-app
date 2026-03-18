# Quick Care (Doctor Appointment Booking System)

A full-stack doctor appointment booking system consisting of a frontend for users, a backend API, and an admin dashboard.

## Project Structure
- **/frontend**: React-based user interface for browsing doctors and booking appointments.
- **/backend**: Node.js/Express-based API server with MongoDB database integration.
- **/admin**: Admin dashboard for managing doctors, appointments, and overall platform settings.

## Getting Started
To get the project running locally, you'll need to install dependencies and configure environment variables in each folder.

### 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file with `MONGODB_URI` and `JWT_SECRET`.
4. `npm start`

### 2. Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### 3. Admin Setup
1. `cd admin`
2. `npm install`
3. `npm run dev`

## Features
- User registration and authentication.
- Doctor search and filtering.
- Appointment booking and management.
- Admin dashboard for platform management.
