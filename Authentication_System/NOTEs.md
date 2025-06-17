# Authentication System - Email Verfication, Reset Password working concept

#### File/Folder Structure

- [x] FRONTEND (Vite + React + TailwindCSS)
- [x] BACKEND (Node.js + Express + MongoDB + JWT)

```bash
Authentication_System/
│
├── backend/                        # Node.js + Express backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── auth.controller.js
│   │   ├── feedback.controller.js
│   │   └── user.controller.js      # Register, login, reset, etc.
│   │
│   ├── middlewares/
│   │   ├── adminAuth.middleware.js
│   │   ├── isAdmin.middleware.js
│   │   └── userauth.middleware.js      # JWT verification
│   │
│   ├── models/
│   │   ├── Feedback.model.js
│   │   └── User.model.js           # Mongoose schema
│   │
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   ├── feedback.routes.js
│   │   └── user.routes.js          # All auth routes
│   │
│   ├── utils/
│   │   ├── apicall.js
│   │   ├── emailTemplates.js       # HTML templates for email
│   │   ├── mongodb.js
│   │   └── nodemailer.js           # Nodemailer transporter config
│   │
│   ├── .env                        # Environment variables
│   ├── index.js                    # Entry point (Express server)
│   ├── package.json
│   └── README.md
│
├── frontend/                       # React + Vite + Tailwind frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/             # Reusable components (inputs, buttons, etc.)
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── contexts/               # Axios API calls
│   │   │   └── AppContext.jsx
│   │   │
│   │   ├── pages/                  # Register, Login, ForgotPassword, etc.
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── EmailVerify.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── ThankYou.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.css
│   ├── vite.config.js              # Set up proxy to backend
│   ├── .env                        # VITE_ prefixed keys
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md                       # Root README
```

<br>

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

MONGODB_URL='mongodb://localhost:27017/'
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

- Update code in `index.js`

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
      expiresIn: "24h",
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
      expiresIn: "24h",
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

- Update code in controllers/`auth.controller.js`

```js
// 9] Create the controller fun for send verification OTP to the user email
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    // find the user from our database
    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already verified" });
    }

    // suppose account is not verified then generate OTP & send user email id
    // generate OTP using math random fun
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 3 * 60 * 1000; // 3 mins

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Verification OTP sent on Email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
```

### Get the OTP & verify the user account - controller fun

- Update code in controllers/`auth.controller.js`

- user has receive OTP on the email

```js
// 10] Create the controller fun for verify Email

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    // find the user from the database
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
```

### Create middleware function

- Get the user id from the token & token is store in the cookies.
- We need a middleware that will get the cookie & cookie find the token.
- From the token find the user id & user id added in the request body.
- Update code in middleware/`userauth.middleware.js`

```js
import jwt from "jsonwebtoken";

// 1st middlware function executed i.e. userAuth
const userAuth = async (req, res, next) => {
  const { token } = req.cookies; // 2nd get the token from the cookie

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    // 3rd decode the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body = req.body || {};
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next(); // 4th next fun execute our controller fun "sendVerifyOtp" -> userId that is added in middleware userauth
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// 5th export the middleware
export default userAuth;
```

- API endpoints in -> Update code in routes/`auth.routes.js`

```js
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/auth.controller.js";
import userAuth from "../middleware/userauth.middleware.js";

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
```

- [x] Test the endpoints send-verify-otp & verify-account using postman

- OTP will received on email
  ![alt text](./backend/utils/test-send-verify-otp.png)
  <br>

- Verify account through on email otp
  ![alt text](./backend/utils/test-verify-account.png)
  <br>

### User already authenticated or not? - add controller fun

- Update code in controllers/`auth.controller.js`

```js
// 11] Check if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
```

- API endpoints in -> Update code in routes/`auth.routes.js`

```js
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
} from "../controllers/auth.controller.js";

authRouter.post("/is-auth", userAuth, isAuthenticated);
```

- In postman "success"=> "true" then token in cookies then user is authenticated.
- Authenticating using **middleware**.

### Create API for send the password rest otp

- Update code in controllers/`auth.controller.js`

```js
// 12] Send password reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000; // 5 min

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Password Reset OTP`,
      text: `Your OTP for resetting your password is ${otp}. Use this oTP to proceed with restting your password.`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
```

### Create verify OTP & reset user password

- Update code in controllers/`auth.controller.js`

```js
// 13] Reset user password
export const restPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP and new password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
```

- API endpoints in -> Update code in routes/`auth.routes.js`

```js
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  restPassword,
} from "../controllers/auth.controller.js";
```

- [x] Test the endpoints reset OTP & reset password OTP using postman
- password reset OTP
  ![alt text](test-send-reset-otp.png)
  <br>
- reset password
  ![alt text](test-reset-password.png)
  <br>

###

2:15:00 NOTES
