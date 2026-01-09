const AppError = require("../utils/AppError");

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new AppError("Please provide email", 400));
  }
  if (!password) {
    return next(new AppError("Please provide email", 400));
  }
  next();
};

module.exports = validateLogin;
