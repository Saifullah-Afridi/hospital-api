/*  so whenever we call next(AppError) it will trigger this error middleware
as the err will have message,status code,status message and stack of the error
we get those properties
*/

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const status = err.status || "error";
  const stack = err.stack;

  // * For production we will check if the error is operational means due to user fault it occuss
  // * then we will send just the error message and status message as that will enough

  // ! do not send the stack in production because it shows the valuenribilties in our code
  //! and the security leaks can happen
  //! in production we should not the stack simple

  if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      res.status(statusCode).json({ status, message });
    }

    //! if it is not operational we will send something is went wrong because it means that there is error in our code
    //! or some other issue in our api at least it is confirmed that it is not caused by the user
    else {
      res.status(statusCode).json({
        status,
        message: "Something went wrong,Please try again later",
      });
    }

    //! in development mode we can send thee more and more information about the error so we can fix it as soon as possible
  } else {
    res.status(statusCode).json({ status, message, stack });
  }
};

module.exports = errorMiddleware;
