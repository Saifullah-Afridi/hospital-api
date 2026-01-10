const User = require("../api/users/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const protect = catchAsync(async (req, res, next) => {
  //*  1) first we will get the token from the req headers are cookies
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  //* if not token it means the user is no login
  if (!token) {
    return next(new AppError("Please login and try again", 401));
  }

  //* if we get the token now verify the token to check if it is modified
  //* this will gives the payload in the payload we stored the user id so the object
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  //* now we will get the user document form the user using the id of the payload
  const currentUser = await User.findById(decode.id);

  //!this is important always check it ...there might be cases where the token exist but the user is deleted
  if (!currentUser) {
    return next(new AppError("User no longer exist", 401));
  }

  // if everthing wroks we will modify the request object and will move to the next middleware
  req.user = currentUser;

  next();
});

module.exports = protect;
