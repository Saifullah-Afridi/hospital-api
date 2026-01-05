require("dotenv").config({ path: "../.env" });

//npm packages
const express = require("express");
const connectDB = require("./config/db");

//custom modules
const authRoutes = require("./api/auth/auth.routes");
const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);

//database connection
connectDB();

//starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});
