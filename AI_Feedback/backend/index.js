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
app.get('/', (req, res) => {
  res.send('cohort!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})