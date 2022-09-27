const express = require("express");
const router = express.Router();

const [
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  verifyToken
] = require("../auth/customers");

const authenticated = require("../auth/check.auth");
const validateUserInput = require("../config/validation");
const sendMail = require("../config/sendmail")


router.post(
  "/register",
  validateUserInput,
  authenticated[1],
  registerCustomer,
  sendMail
);
router.post("/login", authenticated[1], loginCustomer);
router.get("/logout", authenticated[0], logoutCustomer);
router.get("/verify", verifyToken);

module.exports = router;
