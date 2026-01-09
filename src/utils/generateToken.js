const jwt = require("jsonwebtoken");

//this function will take a user object and will generate the token
//in the payload we will enter only the user id
// the second is secret key
const generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = generateToken;
