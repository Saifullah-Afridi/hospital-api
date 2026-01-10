require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
//npm packages

//custom modules
const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/users/user.routes");
const errorMiddleware = require("./middleware/error.middleware");
const protect = require("./middleware/aut.middleware");
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.get("/", (req, res) => {
  res.status(200).send("Hello there");
});

//testing the protect middleware
app.get("/me", protect, (req, res) => {
  res.status(200).send("Hello there");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//* global error handler
app.use(errorMiddleware);

//database connection
connectDB();

//starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});
