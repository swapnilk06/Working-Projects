# URL Shortner

To build a production-level URL shortener using the MERN stack (MongoDB, Express.js, React.js, Node.js).

- From setting up the backend APIs to deploying the frontend with best practices.

### MVC File/Folder Structure (Model-View-Controller)

- [x] We can follow MVC Structure for that project

### Steps for creating basic backend of project

- [x] In **Backend** basic app setup
  - [1] `cd Backend`
  - [2] `npm init -y` -> for package.json file
  - [3] `npm i express`
  - [4] Create `app.js`
    - <i>Modularize slowly after all time</i>
  - [5] `npm i nodemon`
  ```json
  	"scripts": {
  	"dev": "nodemon app.js"
  	},
   "type": "module",
  ```
  - [6] `npm run dev`

app.js

```js
import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

#### Decide Routes
- GET : Redirection
- POST : Create short URL

- [x] [Nano ID](https://www.npmjs.com/package/nanoid) precaution for duplicacy 
  - It gives random strings for JavaScript
  - Install Nano ID -> `npm i nanoid`

