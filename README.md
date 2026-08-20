# Hospital Appointment System

A comprehensive hospital appointment management system containing a React frontend, an Express REST API backend, and a Mongoose-based database schema configuration.

---

## Project Structure

* `src/` — React frontend codebase (Vite)
* `server/` — Node.js & Express backend API
  * `index.js` — Express server setup, API endpoints, logging, and error-handling middleware
  * `models.js` — Mongoose schemas for Patient, Doctor, and Appointment validation
  * `mongodb_demo.js` — Standalone script demonstrating Mongoose connection, database operations, and error-formatting validation testing

---

## Getting Started

### Prerequisites
* Node.js (v18 or higher)
* MongoDB running locally at `localhost:27017`

### Installation
1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

---

## Running the Applications

### 1. Start the React Frontend
From the root directory:
```bash
npm run dev
```
Open the application at the URL displayed in the terminal (usually `http://localhost:5174` or `http://localhost:5173`).

### 2. Start the Express API Server
From the `server/` directory:
1. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
2. Run the server:
   ```bash
   node index.js
   ```
The Express server starts listening on `http://localhost:5000`.

### 3. Run the MongoDB Validation Demo
From the `server/` directory:
```bash
node mongodb_demo.js
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/doctors` | Retrieve all doctor records |
| `GET` | `/api/v1/appointments` | Retrieve all scheduled appointments |
| `POST` | `/api/v1/appointments` | Create a new appointment |
| `GET` | `/api/v1/trigger-error` | Simulates an unhandled server error to demonstrate global error-handling |

---

## Features Implemented

### Task 1 & 2: Component Architecture & Routing
* Modern structured landing, booking, and doctor directory views.
* Navigation without full page reloads via React Router.
* Dynamic status-based CSS styles for appointments (pending, confirmed, cancelled).

### Task 3: Express API & Middleware
* Global Request Logger: Logs `[METHOD] [PATH] [TIMESTAMP]` for every request.
* Global Error Handler: Captures unhandled errors and returns structured JSON responses instead of raw stacks.

### Task 4: API Consumption in React
* Asynchronous data fetching on page mount (`useEffect`).
* Displays explicit loading, error, and resolved data views.

### Task 5: Mongoose Schemas & Validations
* Relational Mongoose schemas (Doctor, Patient, Appointment) utilizing Mongoose references.
* Blood group enums validation.
* Appointment status enums validation.
* Character length limit constraint for reasons.
