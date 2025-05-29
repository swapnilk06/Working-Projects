# Authentication & Authorization Based on Roles Access Control

Goal : Practical Implementation working of Authentication & Authorization?

- [x] Overview
- Node
- Mongodb : Database storage
- Routes & Controllers : Handle the authentication
- 1] Controllers
  - User for **Register**
  - & them **Login**
- 2] User Route API

  - Admin
  - Manager
  - User

- [x] Working flow
      1] - Role: **Admin** -> Can access all ther user routes. i.e. admin, manager, user
      2] - Role: **Manager** -> Can only access manager & user route.
      3] - Role: **User** -> Can only access the user.

- [x] Installation Dependencies
- `npm init` -> Node server
- `npm i express` -> Express Framework
- `npm i jsonwebtoken` -> Manage JWT tokens
- `npm i bcrypt` -> Hash the password
- `npm i dotenv` -> Access variables from .env
- `npm i mongoose` -> Mongodb database
- [x] Dev Dependencies
- `npm i nodemon --save-dev` -> Restart the server auto after changes

- [x] Create files/folders
- index.js -> main starter file
- .env -> save secret files
- config -> for database connection
- routes
- controller
- middleware

#### Check express server

index.js

```js
import express from "express";
import dotenv from "dotenv";

const app = express();

// middleware
app.use(express.json());

// routes

// server start
const port = process.env.PORT || 4000;
app.listen(port, (err) => {
  if (err) {
    console.error(`Failed to start server on port ${port}:`, err.message);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${port}`);
});
```

#### Database connection

index.js

```js
import express from "express";
import dotenv from "dotenv";
import db from "./utils/db.js";

db();

dotenv.config();
const app = express();

// middleware
app.use(express.json());

// routes

// server start
const port = process.env.PORT || 4000;
app.listen(port, (err) => {
  if (err) {
    console.error(`Failed to start server on port ${port}:`, err.message);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${port}`);
});
```

db.js

```js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB Connected: ${conn?.connection?.host} & Database Name: ${conn.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default db;
```
