const AppError = require("../../utils/AppError");
const User = require("./user.model");

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return next(
        new AppError("User is already registered with this email", 400)
      );
    }

    const newUser = await User.create({
      name,
      email,
      password: "password",
    });

    newUser.password = undefined;

    res
      .status(201)
      .json({ message: "User has been created successfully", newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { registerUser };
