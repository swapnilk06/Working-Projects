# Authentication System - Email Verfication, Reset Password working concept

- [x] Requirement Installation
- npm init -> `Server initialize`
- npm i express -> `Create our app`
- npm i cors -> `Connect backend with frontend`
- npm i dotenv -> `Helps to store environment variables in the backend`
- npm i nodemon -> `Restart the backend whenever any changes in code file`
- npm i jsonwebtoken -> `Create token for the authentication`
- npm i mongoose -> `Helps us to connect with mongoDB database`
- npm i bcrypt -> `Encrypt the password & save in the database`
- npm i nodemailer -> `Helps us to send the email`
- npm i cookie-parser -> `Send the cookies in the API response`



### Creating simple express app

index.js

```js
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4000; // app running port

app.use(express.json()); // all the request will pass using json
app.use(cookieParser());
app.use(cors({ credentails: true })); // will send the cookies in the response

app.get("/", (req, res) => res.send("API Working Successfully")); // msg visible

app.listen(port, () => console.log(`Server start on port: ${port}`)); // after start backend show that message
```

### Connect the express with mongoDB

.env

```env
PORT=3000

MONGODB_URL='mongodb://localhost:27017/authentication_system_db'
```

utils/mongodb.js

```js
import mongoose from "mongoose";

const db = async () => {
  mongoose.connection.on("connected", () => console.log("MongoDB Database Connected"));

  await mongoose.connect(`${process.env.MONGODB_URL}/auth-system`);
};

export default db;
```

index.js

```js
import db from "./utils/mongodb.js";

db(); // mongoDB connection
```
