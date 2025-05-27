

## Backend Installation 

Node/bun/Deno -> JavaScript Execution Engine

### backend
1] Project Initialize <b>node env</b> -> `npm init` 
	- desc: a node project for AI Feedback

2] Two ways get through require -> "type":"commonjs" OR import -> "type":"module" in <b>package.json</b>
	- "type":"module"(latest) than require
	- we can used import easily through "type":"module" 

3] `.env` - All project critical infrastructure

4] Express.js -> Request/Response
	- Always work with node/bun but with extra code & hard work.
- Install Express -> `npm install express` 
- express doc code & modify that into -> <b>index.js</b>
```js
import express from "express";

const app = express();
const port = 3000; // don't used common port

// app is web sever - get request on route in "/" 
app.get('/', (req, res) => {
  res.send('cohort!')
})  // that code run on request
// How to send get request? hit in url -> `http://127.0.0.1:3000` OR `localhost:3000`

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
- <b>Every web server is infinite loop</b>

5] Run in Node -> `node index.js`

6] Utility Nodemon -> Monitor the node & when required then reload it 
- Nodemon (<b>dev dependencies</b>) install Nodemon -> `npm i -D nodemon`

7] Run script -
```json
"scripts": {
    "dev": "nodemon index.js"
  }
```

- [x] Route always start with <b>"/"</b>.

8] `.env` enviornment variable of server
- Port always put into `.env`
- Install package -> `npm i dotenv`
- Import dotenv -> import `dotenv/config`

- [x] As production vise port implement in -

`.env`
```env
PORT=3000
```
`index.js`

```js
import express from "express";
import dotenv from "dotenv";

dotenv.config()

const app = express();
const port = process.env.PORT || 4000; // don't used common port

// app is web sever - get request on route in "/" 
app.get('/', (req, res) => {
  res.send('cohort!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
- Server can allocate the port


9] Install Cors package -> `npm i cors`
- [x] Server problematic thing - `CORS`
- User request -> frontend to -> backend (CORS)
- In localhost cores resolved also in frontend using <b>Proxy</b>.
- Used cors -> `import cors from "cors"`;
- Frontend & Backend serve from different places that for we need `cors`.
- In production :
	- backend on <b>AWS</b>, <b>Digital Ocean</b>
  - fronend on <b>Versel</b>, <b>Netlify</b>
- Use of `cors` becz, our backend talk with only their created frontend not other.
- Frontend <==> `CORS` <==> Backend


#### Boiler plate code 
- No any business logic in boiler code
index.js
```js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
		methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization']
	})
);

app.use(express.json()) // for get/post json value
app.use(express.urlencoded({extended:true})) // handle url encoding

const port = process.env.PORT || 4000; // don't used common port

// app is web sever - get request on route in "/" 

// Below 3 routes are server basic needs
app.get('/', (req, res) => {
  res.send('cohort!');
});

app.get('/hitesh', (req, res) => {
  res.send('Hitesh');
});

app.get('/piyush', (req, res) => {
  res.send('Piyush');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
```

10] Database Connection 
- For data store use <b>db</b> -> `MongoDB`
- Backend talk with -> `mongoose`(package) -> & that talk with database(MongoDB).
- mongoose -> its `middelman`
- Install mongoose -> `npm i mongoose` 


11] DB utils with boiler code

.env
```env
PORT=3000

MONGO_URL=mongodb://localhost:27017/ai_feedback

BASE_URL=http://127.0.0.1:3000
```

utils -> db.js
```js
import mongoose from "mongoose";

// use of dotenv in that becz of sometime loading 3rd part libraries in that time doytenv not loaded
import dotenv from "dotenv"
dotenv.config()

// goal : export a function that connects to db 

const db = () => {
	mongoose.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Connected to mongodb");
	})
	.catch((err) => {
		console.log("Error connecting to mongodb");
	})
}

export default db;
```

connect db in -> `index.js`
```js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js"; // sometime also write db.js depends on configuration settings

dotenv.config()

const app = express();

app.use(
	cors({
		origin: process.env.BASE_URL,
		credentials: true,
		methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization']
	})
);

app.use(express.json()) // for get/post json value
app.use(express.urlencoded({extended:true})) // handle url encoding

const port = process.env.PORT || 4000; // don't used common port

// app is web sever - get request on route in "/" 
app.get('/', (req, res) => {
  res.send('cohort!')
})

// connect to db
db();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

12] Check db connected or not? -> `npm run dev`


- [x] Completed Backend Boilerplate code with installation of -
- dependencies : `cors, dotenv, express, mongodb(mongoose)`
- devdependencies : `nodemon` 

<br>



#### What to build? and What Data to Host(store)?

- [x] Roles
- USER
- ADMIN

- [x] User Schema
- Name
- Email
- Password

- [x] isVerified
- passwordResetToken
- passwordResetExpires

- [x] User verification
- verificationToken

- [x] createdAt
- [x] updatedAt


1] Create model folder for data seperation 
User data boiler code -> `model/User.model.js`
```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema()

const User = mongoose.model("User",userSchema)

export default User
```
- `That above structure always same only change "userSchema" & "User" variable names`.

2] Filled data in User -> `User.model.js`

3] Seperated data folder of `model`, `controller`, `routes`

4] Register controller in -> `controller/user.controller.js`
```js
//  register controller
const registerUser = async (req, res) => {
	res.send("registered");
};

export {registerUser}
```

5] Route Boiler plate code in -> `routes/user.routes.js`
```js
import express from "express";

// router 
const router = express.Router()

export default router
```

6] Import user route in -> `index.js`


#### Summary of all 
- initialize `package`
	- project init -> `npm init` & build `package.json`
- About `Errors`
	- common error -> `"type":"module"`
- `index.js` 
- Come with `Express` -> for `routing`
- `Port` in that `process.env` file
- `.env` package
- `cors`
- `express.json`
- `model`
- `route`
- `controller`
- `Mongodb (mongoose)`

----

<br>

### User Register

1] Register User

- [x] Postman is client to allow for send web request.
- [x] We send post request from browser we can make whole frontend.

- zod is library for validation

2] Crypto module for tokens

3] Node Mailer for send mails
- Mailtrap for sending testing email
- Install nodemailer -> `npm install nodemailer`

4] Encrypt password through common package using `bcryptjs`
- Install bcryptjs -> `npm install bcryptjs`

4] We have any activity related password - 
- save example
	- pre-save, save, post-save
	- before save activity some work & same after save some work i.e. `hooks`.

6] Stateless login -> `JWT`(Json Web Token)
- Install jwt -> `npm install jsonwebtoken`


----

<br>

### Teting give Cookie Error
Install - cookie-parser -> `npm install cookie-parser`
- Its middleware of Express.js
- Used to automatically reads and processes cookies from the incoming requests sent by clients.

### Backend with mongodb & testing

1] Create controller `getMe`, `logoutUser`, `resetPassword`, `forgotPassword`

2] Create `middleware` i.e. only a code functionality
- Middleware always used in our `routes`
