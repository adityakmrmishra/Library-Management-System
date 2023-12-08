const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require('cors');
// const path = require("path");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

// app.use(express.json());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));




// cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));


app.get('/', function(req, res) {
  res.send('Welcome to our API')
})

// Route Imports
const user = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes")




app.use("/api", user);
app.use('/api', bookRoutes); 


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
