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
