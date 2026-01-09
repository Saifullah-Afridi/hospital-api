const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");
const User = require("./user.model");

const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const isUser = await User.findOne({ email });
  if (isUser) {
    return next(
      new AppError("User is already registered with this email", 400)
    );
  }

  const newUser = await User.create({
    name,
    email,
    password: password,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    message: "User has been created successfully",
    newUser,
  });
});

module.exports = { registerUser };
