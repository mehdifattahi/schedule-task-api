# Schedule and Task Management API

This project is a NestJS-based API for managing schedules and tasks. It provides endpoints for creating, reading, updating, and deleting schedules and tasks.

## Technologies Used

- NestJS
- Prisma (ORM)
- Jest (Testing)
- Supertest (API Testing)

## Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn
- PostgreSQL database

## Setup

1. Clone the repository:
git clone https://github.com/mehdifattahi/schedule-task-api
cd schedule-task-api
2. Install dependencies:
npm install
3. Set up your environment variables:
Create a `.env` file in the root directory and add your database URL:
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
4. Run Prisma migrations:
npx prisma migrate dev
5. Start the server:
npm run start

## API Endpoints

### Schedules

- `POST /schedules`: Create a new schedule
- `GET /schedules`: Get all schedules
- `GET /schedules/:id`: Get a specific schedule
- `PATCH /schedules/:id`: Update a schedule
- `DELETE /schedules/:id`: Delete a schedule

### Tasks

- `POST /tasks`: Create a new task
- `GET /tasks`: Get all tasks
- `GET /tasks/:id`: Get a specific task
- `PATCH /tasks/:id`: Update a task
- `DELETE /tasks/:id`: Delete a task

## Testing

This project uses Jest for testing. There are two main test suites:

To run the tests:
npm run test
