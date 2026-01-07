const mongoose = require("mongoose");

const connectDB = async () => {
  const dbURL = process.env.DB_URL;
  console.log(dbURL);

  if (!dbURL) {
    console.error("Database URL is not defined in env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");

    mongoose.connection.on("connected", () => {
      console.log("mongoose defualt connection is open");
    });

    mongoose.connection.on("error", (err) => {
      console.error("mongoose connection error", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("mongoose connection disconnected");
    });

    //graceful shutdown

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("mongoose connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("mongodb connection failed".error);
    process.exit(1);
  }
};

module.exports = connectDB;
