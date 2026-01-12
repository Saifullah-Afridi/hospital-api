const Patient = require("./patient.model");
const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");

const createPatient = catchAsync(async (req, res, next) => {
  //we will first get the patient nic and then check the db if the patient exist with that nic

  const { nic } = req.body;

  if (!nic) {
    return next(new AppError("Please provide NIC", 400));
  }

  const patient = await Patient.create(req.body);

  res
    .status(201)
    .json({ status: "success", message: "Patient has been created", patient });
});

const getAllPatient = catchAsync(async (req, res, next) => {
  const patients = await Patient.find();

  if (!patients) {
    return next(new AppError("There is no patient", 400));
  }

  res.status(200).json({
    status: "success",
    patients,
  });
});

const getSinglePatient = catchAsync(async (req, res, next) => {
  const { patientId } = req.params;
  const { nic } = req.body;

  let patient;

  if (nic) {
    patient = await Patient.findOne({ nic });
  }

  if (patientId) {
    patient = await Patient.findById(patientId);
  }

  if (!patient) {
    return next(new AppError("No patient is found ", 400));
  }

  res.status(200).json({
    status: "success",
    patient,
  });
});

module.exports = { createPatient, getAllPatient, getSinglePatient };
