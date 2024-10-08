# Full-Stack Application (Client & Server)

This project contains both the frontend and backend code. The backend is built using `Node.js` with `Express` and MongoDB for the database. The frontend is a React app that interacts with the backend to display and upload CSV files.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance
- [npm](https://www.npmjs.com/)

## Folder Structure

```bash
root/
├── client/          # Frontend React app
├── server/          # Backend Node.js app
└── README.md        # This file
└── DSA              # DSA Solve Question
```

## Backend (Server)

### Steps to run the backend:

1. **Navigate to the server directory**:

   ```bash
   cd server
   ```

2. **Create a `.env` file** in the root of the `server` directory with the following content:

   ```bash
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
   PORT=5000
   ```

   > **Note:** Replace `<username>` and `<password>` with your MongoDB credentials. The URI in this example uses MongoDB Atlas.

3. **Install backend dependencies**:

   ```bash
   npm install
   ```

4. **Start the backend server**:

   ```bash
   npm start
   ```

   The backend server should now be running at [http://localhost:5000](http://localhost:5000).

### API Endpoint:

- **CSV Upload/Display**: The backend provides a route for uploading and displaying CSV data:
  
  ```
  POST /api/v1/csv
  ```

---

## Frontend (Client)

### Steps to run the frontend:

1. **Navigate to the client directory**:

   ```bash
   cd client
   ```

2. **Create a `.env` file** in the root of the `client` directory with the following content:

   ```bash
   REACT_APP_BASE_URL=http://localhost:5000/api/v1/csv
   ```

   > **Note:** Replace `5000` with the actual port number of the running backend if it's different.

3. **Install frontend dependencies**:

   ```bash
   npm install
   ```

4. **Start the frontend application**:

   ```bash
   npm start
   ```

   The frontend app will start on [http://localhost:3000](http://localhost:3000).

---

## Running the Application

1. **Start the backend**:
   Ensure the backend is running first by following the instructions in the **Backend (Server)** section.
   
2. **Start the frontend**:
   After the backend is up and running, start the frontend by following the instructions in the **Frontend (Client)** section.

3. **Interact with the Application**:
   - You can upload CSV files via the frontend, which will interact with the backend to display or store the data.
   - The frontend will communicate with the backend through the `/api/v1/csv` endpoint.

---

## Available Scripts (Frontend & Backend)

In both the `client` and `server` directories, you can run the following scripts:

### Backend:

- **`npm start`**: Starts the backend server in production mode.
- **`npm run dev`**: Runs the backend server in development mode using `nodemon` for auto-restarting.

### Frontend:

- **`npm start`**: Starts the React development server.

---

## Environment Variables

Make sure to provide these environment variables in your `.env` files:

### Backend:

- **`MONGO_URI`**: Your MongoDB connection string.
- **`PORT`**: