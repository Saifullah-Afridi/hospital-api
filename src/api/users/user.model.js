const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "The minimum length should be 6 characters"],
      select: false, //the password will not be returned in querrirs
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "receptionist"],
    },
  },
  { timestamps: true }
);
