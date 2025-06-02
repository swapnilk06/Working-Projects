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

`index.js`

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

utils/`mongodb.js`

```js
import mongoose from "mongoose";

const db = async () => {
  mongoose.connection.on("connected", () =>
    console.log("MongoDB Database Connected")
  );

  await mongoose.connect(`${process.env.MONGODB_URL}/authentication_system_db`);
};

export default db;
```

update in `index.js`

```js
import db from "./utils/mongodb.js";

db(); // mongoDB connection
```

### Store the users data into mongoDB database

- to store into database

models/`User.model.js`

```js
import mongoose from "mongoose";

// 1st create user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // required: true means name field required to store any user in the database
  email: { type: String, required: true, unique: true }, // can't create mutiple user with same email id
  password: { type: String, required: true },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false }, // if the user account is verified then the value will be true
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
});

// 2nd - using the user schema create the user model

const userModel = mongoose.models.user || mongoose.model("user", userSchema); // search for user model is available then user mode used in "userModel", its not available create the user model using the user schema

// export the user model
export default userModel; // use can userModel in other file to store the data in the mongodb database
```

### Create the new user controller function (register, login, logout)

- using the controller function create the API end point
- create the **controller function**
- create the different controller function like ** register login, logout, verify account & password reset** & create **API endpoints** using the controller function.

controllers/`auth.controller.js`

```js
import bcrypt from "bcrypt"; // encrypt password
import jwt from "jsonwebtoken"; // generate token for authentication
import userModel from "../models/User.model.js";

// 1] create the controller fun for user register
export const register = async (req, res) => {
  const { name, email, password } = req.body; // to create "new user" we need to name, email id, password we will get from req.body

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
    // "success: false" -> user not created, any of detail are missing name, email, password & return success: false
  }

  // after succesfully executed above code whenever success true
  try {
    // 3] before encrypt password check user existance
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" }); // no user with email id then stroed into hash password
    }

    // 2] encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // before hash password check the existing user

    // 4] create the user for the database using user model
    const user = new userModel({ name, email, password: hashedPassword }); // get 3 required field only from model others are default
    await user.save(); // user created after store in the moongoDB database

    // 5] create token for the authentication using the cookies
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 6] after generating token we have to send to user in the response & response add the cookie
    // using the cookie we will send token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });

    // try to create user account & store the data in the database after reached to name, email, password
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 7] create the controller fun for user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    }); // if email & password missing return the response
  }

  try {
    const user = await userModel.findOne({ email });

    // if user could not find any user from email id
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 8] create the controller fun for user logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
```

### After create API endpoint using controller fun - Create Routes

routes/`auth.routes.js`

```js
import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js"; // add 3 controller funs

const authRouter = express.Router(); // after creating endpoints add "authRouter" in index.js

// created 3 endpoints in authRouter
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
```

update all over code in `index.js`

```js
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import db from "./utils/mongodb.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
const port = process.env.PORT || 4000; // app running port
db(); // mongoDB connection

app.use(express.json()); // all the request will pass using json
app.use(cookieParser());
app.use(cors({ credentails: true })); // will send the cookies in the response

// API Endpoints
app.get("/", (req, res) => res.send("API Working Successfully")); // msg visible
app.use("/api/auth", authRouter);

app.listen(port, () => console.log(`Server start on port: ${port}`)); // after start backend show that message
```

### After creating 3 API (register, login, logout) test that using Postman

- [x] Test the user registration API using postman
- In development env **Cookies** show "secure => false" otherwise in production show "secure => true"
  ![alt text](./backend/utils/test-registration.png)
  <br>

- [x] Test the user login API
- Incorrect email
  ![alt text](./backend/utils/test-login-incorrect.png)
  <br>

- Incorrect password
  ![alt text](./backend/utils/test-login-incorrect-2.png)
  <br>

- [x] Test the user logout API
- after logout don't have anything in the cookies.

### Email functionality - controller fun

- New user account can br created user will receive message.
- Configure **node mail** that allow us to send email.

/utils/`nodemailer.js`

```js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;
```

Update code in controllers/`auth.controller.js`

```js
import transporter from "../utils/nodemailer.js";

// Sending email to user
const mailOptions = {
  from: process.env.SENDER_EMAIL,
  to: email,
  subject: "Welocome to Authentication System",
  text: `Welcome Auth base website. Your account has been created with email id: ${email}`,
};

await transporter.sendMail(mailOptions);

// after sending the email get response success => true
```

`.env`

```env
PORT='3000'

MONGODB_URL='mongodb://localhost:27017'

JWT_SECRET = 'secreat##key'

NODE_ENV ='development'

SMTP_USER=
SMTP_PASS=
SENDER_EMAIL=
```

- Email send welcome msg successfully
![alt text](./backend/utils/test-email-msg.png)
<br>


### Send verification OTP - controller fun