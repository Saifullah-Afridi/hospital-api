const AppError = require("../utils/AppError");

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    return next(new AppError("Name is required", 400));
  }
  if (!email) {
    return next(new AppError("Email is required", 400));
  }
  if (!password) {
    return next(new AppError("Password is required", 400));
  }
  next();
};

module.exports = validateRegister;
