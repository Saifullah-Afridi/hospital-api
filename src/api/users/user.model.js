const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, //in the database email will be unique
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "The minimum length should be 6 characters"],
      select: false, //the password will not be returned in querrirs
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "receptionist", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

//this pre save runs only when the user is first created
//or save() method is called
//so it means that whenever we call on save method
//this method will run and the password which is already hashed
//will hashed again
//to prevent this we make a logic
//so that it runs only when the object is first created or when the password is changed

//key point....if you change the password you must call on save() to runs this pre

userSchema.pre("save", async function (next) {
  //the logic is here
  //if the password is not modified just return and run the next middleware if it exist
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  //if we ommit the next() then the response will stuck in this method
  next();
});

//instance method ....it is on each object
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
