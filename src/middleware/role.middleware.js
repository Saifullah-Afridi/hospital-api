const AppError = require("../utils/AppError");

//we will restric a route by passing different roles to this function the followed rooute will be accessible only by those roles

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have the permission to perform this action",
          403
        )
      );
    }
    next();
  };
};

module.exports = restrictTo;
