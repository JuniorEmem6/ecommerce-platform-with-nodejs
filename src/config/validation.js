module.exports = validateUserInput = (req, res, next) => {
  const { name, phone, email, password, confirmPassword } = req.body;

  if (!name || !phone || !email || !password || !confirmPassword)
    return res.status(406).json({
      status: 1,
      message: "All field is required",
    });

  if (password.length < 9)
    return res.status(406).json({
      status: 1,
      message: "Password must be at least 9 character",
    });

  if (password == phone || password == "123456789" || password == name)
    return res.status(406).json({
      status: 1,
      message: "Password must not be your name phone or 123456789",
    });

  if (password != confirmPassword)
    return res.status(406).json({
      status: 1,
      message: "Password does not match",
    });

  // if (!email.search("@") || email.search(".com"))
  // return res.status(406).json({
  //   status: 1,
  //   message: "Email must contain @ and .com",
  // });

  return next();
};
