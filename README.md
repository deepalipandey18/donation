# Donation Tracker

A simple donation tracking application with a Node.js + Express backend and a Vite + React frontend.

## Repository Structure

- `backend/` — Express API server and MongoDB models.
- `frontend/` — React app (Vite) for users and admin UI.

## Features

- Create and view donations
- Admin dashboard for management

## Tech Stack

- Backend: Node.js, Express, Mongoose
- Frontend: React (Vite)
- DB: MongoDB (replaceable with any Mongo-compatible DB)

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- A running MongoDB instance (local or cloud)

## Setup & Run

Backend

1. Open a terminal and change to the backend folder:

```
cd backend
```

2. Install dependencies and start the server:

```
npm install
npm run start
```

The backend's package.json defines a `start` script which runs `node server.js`.

Frontend

1. Open a terminal and change to the frontend folder:

```
cd frontend
```

2. Install dependencies and start the dev server:

```
npm install
npm run dev
```

The frontend uses Vite; open the URL shown in your terminal (usually `http://localhost:5173`).

## Environment Variables

- Backend: set `MONGODB_URI` (or edit `server.js` to match your connection string).

## Contributing

1. Create a branch for your change.
2. Open a PR with a clear description of the change.

## Next Steps / Optional

- Add tests for backend routes and frontend components.
- Add Dockerfiles for easier local development and deployment.

---

If you want, I can: add example `.env` files, a `Makefile` or Docker setup, or update README with screenshots and API docs.
