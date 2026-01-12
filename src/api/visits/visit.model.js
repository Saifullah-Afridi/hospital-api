const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Patient,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    wardName: {
      type: String,
      required: [true, "Ward name is required"],
    },
    visitCategory: {
      type: String,
      enum: ["emergency", "regular"],
      default: "regular",
    },
    status: {
      type: String,
      enum: ["pending", "incomplete", "complete"],
      default: "pending",
    },
    notes: String,
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
