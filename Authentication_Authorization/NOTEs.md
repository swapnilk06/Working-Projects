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

#### Create routes & controller for authentication

- Create router register & router login in **auth.routes.js**.

- Create controller register & controller login in **auth.controller.js**.

- Import controller register & controller login in **auth.routes.js**.

#### Create model for register & login controller(API for register & login)

-[x] `Test User Authentication`

index.js

```js
import express from "express";
import dotenv from "dotenv";
import db from "./utils/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

db();

dotenv.config();
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

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

auth.controller.js

```js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User.model.js";

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashPassword, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User registered with username ${username}` });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: `Something went wrong` });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with username ${username} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid Credentails` });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: `Something went wrong` });
  }
};

export { register, login };
```

User.model.js

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // define properties
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "user"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
```

auth.routes.js

```js
import express from "express";
import { register, login } from "../controller/auth.controller.js";

// router
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
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
      `MongoDB Connected: ${conn?.connection?.host} & Database: ${conn.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default db;
```

- [x] Testing successful frontend as **Postman** & database as **MongoDB Compass**
![alt text](./backend/utils/Testing-bckd-db.png)
<br>

