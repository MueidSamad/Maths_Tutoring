# Maths Tutoring

This repository contains the frontend and backend for the Maths Tutoring application.

## Project structure

- **frontend/** – React application built with Vite and a small Express email server.
- **backend/** – Django project configured to use PostgreSQL.

## Running the frontend

1. `cd frontend`
2. Install dependencies with `npm install`.
3. Run the development server using `npm run dev` or build with `npm run build`.
4. The email API can be started with `npm run server`.

## Running the backend

1. Ensure a PostgreSQL server is available and set the following environment variables as needed:
   - `POSTGRES_DB`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_HOST` (default `localhost`)
   - `POSTGRES_PORT` (default `5432`)
2. `cd backend` and install Python requirements:
   `pip install -r requirements.txt`
3. Run the database migrations:
   `python manage.py migrate`
4. Start the Django server:
   `python manage.py runserver`
