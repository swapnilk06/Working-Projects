

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
