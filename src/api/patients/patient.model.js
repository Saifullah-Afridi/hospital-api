const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    nic: {
      type: String,
      required: [true, "NIC is required"],
      unique: [true, "NIC is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    type: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports;
