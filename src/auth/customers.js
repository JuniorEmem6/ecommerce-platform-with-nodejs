const bcrypt = require("bcrypt");
const [insertCustomer, selectCustomer] = require("../database/db-connect");

const registerCustomer = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    insertCustomer(req.body, hashedPassword, res);

    return next();
  } catch (error) {
    return res.status(500).json({
      status: 1,
      message: "Internal Server Error",
    });
  }
};

const loginCustomer = (req, res) => {
  session = req.session;
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(500).json({
      status: 1,
      message: "Email and password field is required",
    });

  selectCustomer(email, password, session, res);
};

const logoutCustomer = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(500).json({
        status: 1,
        message: "Could not log user out",
      });

    return res.status(200).json({
      status: "ok",
      message: "You are successfully logged out",
    });
  });
};

const verifyToken = async (req, res) => {
  const client = require("../config/redis-connect");
  const { token } = req.query;

  const resp = await client.get(token);

  if (resp)
    return res.status(200).json({
      status: "ok",
      message: "You are verifed user",
    });

  return res.status(500).json({
    status: 1,
    message: "Invalid or expired token",
  });
};

module.exports = [registerCustomer, loginCustomer, logoutCustomer, verifyToken];
