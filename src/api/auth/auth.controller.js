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

//when the user forgot password user will hit the route
//the requset will be post will send email
//we will extract the email form request body

//will check if the email exist i mean the user with that email
//generate the tokenn...in db store the hashed veriosn
//generate url

const forgotPassword = catchAsync(async (req, res, next) => {
  // the user will send email and will extract it from the req.body
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Please provide Your email", 400));
  }

  // find the user
  const user = await User.findOne({ email });

  if (!email) {
    return res.status(200).json({
      status: "success",
      message: `Email has been sent to ${email}.Please check your email`,
    });
  }

  const resetToken = user.createPasswordResetToken();

  // only those validation will be checked which fields are changend
  await user.save({ validateBeforeSave: false });

  //generate reset URL

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/reset-password/${resetToken}`;

  console.log(`Password reset url : ${resetURL} `);

  res.status(200).json({
    status: "success",
    message: `The email has been send to ${email},Please check your email`,
  });
});

module.exports = { login, forgotPassword };
