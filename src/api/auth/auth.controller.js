const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");
const generateToken = require("../../utils/generateToken");
const User = require("../users/user.model");

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //  !check the user if the user does not exist
  // !then directly send the response with the error

  // * we will check if the use exist in db
  // * we also select the password explicitly because in the schema we hide it using false
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }
  const isPasswordMatch = user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new AppError("Please provide correct credientials", 401));
  }

  // generate token
  const token = generateToken(user);

  user.password = undefined;

  res
    .status(200)
    .json({ status: "success", message: "Login successfully", token, user });
});

module.exports = { login };
