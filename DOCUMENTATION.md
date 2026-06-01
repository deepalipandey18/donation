# Donation Tracker - Documentation

## Overview

Donation Tracker is a simple full-stack application for recording and viewing donations. It uses a Node.js + Express backend with MongoDB, and a React frontend built with Vite.

## Repository layout

- `backend/` — Express server, Mongoose models, API routes.
- `frontend/` — Vite + React application for users and admin.

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

## Quick start

1. Start the backend

```bash
cd backend
npm install
# create a .env file (see backend/.env.example)
npm run start
```

2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL printed by Vite (commonly http://localhost:5173).

## Backend — configuration

The backend currently connects to MongoDB inside `server.js`. For production or local development you should use an environment variable instead of hardcoding credentials.

Create a `.env` file in the `backend/` folder with:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.example.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000
```

Then update `server.js` to use `process.env.MONGODB_URI` (example shown below).

## Recommended `server.js` connection snippet

```js
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/donations";
mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
```

## API Reference (backend)

Base URL: `http://localhost:5000/api`

- POST `/api/donate`
  - Description: Create a new donation record.
  - Request body (JSON):

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "amount": 25,
  "campaign": "General"
}
```

  - Success response: `200 OK`

```json
{ "message": "Donation successful" }
```

  - Error: `500` on server/database errors.

- GET `/api/donations`
  - Description: Returns all donations sorted by date (newest first).
  - Response: array of donation objects:

```json
[
  {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "amount": 25,
    "campaign": "General",
    "date": "2026-06-01T..."
  }
]
```

- GET `/api/leaderboard`
  - Description: Aggregated totals per donor (grouped by `email`). Returns documents with `_id` (email), `total` (sum of amounts) and `name` (first name seen).
  - Example response:

```json
[
  { "_id": "rich@example.com", "total": 1200, "name": "Rich" },
  { "_id": "jane@example.com", "total": 250, "name": "Jane Doe" }
]
```

## Data model

`Donation` (Mongoose schema in `backend/models/Donation.js`):

- `name`: String
- `email`: String
- `amount`: Number
- `campaign`: String
- `date`: Date (default: now)

## Frontend

The frontend is a Vite + React app located in `frontend/`.

Key files/components in `frontend/src/components`:

- `DonationForm.jsx` — form for submitting a donation (POST `/api/donate`).
- `Dashboard.jsx` — admin dashboard listing donations and/or stats.
- `AdminPanel.jsx` — UI for admin operations (depends on project code).

Run commands are provided in `frontend/package.json`:

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview built assets

The frontend expects the backend API to be reachable at `/api` (CORS is enabled in the backend). If the frontend is served from a different origin, update API base URLs accordingly.

## Development workflow

- Run the backend on port 5000 (or set `PORT`).
- Run the frontend dev server (Vite) — it will run on a different port, Vite supports proxying requests or use absolute paths to the backend.

## Testing (recommended)

- Backend: add unit/integration tests with Jest + Supertest to exercise routes and database interactions.
- Frontend: add React Testing Library + Jest for component tests.

## Docker (example)

A minimal `docker-compose.yml` can run backend and a MongoDB service locally.

```yaml
version: '3.8'
services:
  mongo:
    image: mongo:6
    restart: unless-stopped
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    environment:
      - MONGODB_URI=mongodb://mongo:27017/donations
    ports:
      - "5000:5000"
    depends_on:
      - mongo

volumes:
  mongo-data:
```

(You would need a `Dockerfile` in `backend/` that installs dependencies and starts `node server.js`.)

## Deployment notes

- Always set `MONGODB_URI` as an environment variable in the target environment.
- Build the frontend (`npm run build`) and serve the static files from a CDN or static hosting. Alternatively, serve the built frontend from a simple static server or integrate into the backend as static assets.

## Security & cleanup

- Remove hardcoded credentials from `server.js` and any committed files. Rotate any leaked credentials.
- Add input validation and sanitization on backend routes.

## Contributing

- Fork the repo and create feature branches.
- Ensure linting and tests pass before opening a PR.

## Contact / Next steps

If you'd like, I can:

- Add a `backend/.env.example` file (I will add one now).
- Update `server.js` to read `MONGODB_URI` from environment variables.
- Add API examples (Postman collection) or visual diagrams.
