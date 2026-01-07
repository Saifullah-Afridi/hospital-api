require("dotenv").config({ path: "./env" });
const express = require("express");

//npm packages
const connectDB = require("./config/db");

//custom modules
const authRoutes = require("./api/auth/auth.routes");
const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);

//database connection
connectDB().then(() => console.log("COnnected"));

//starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});
