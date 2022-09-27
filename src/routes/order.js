const express = require("express");
const router = express.Router();

const order = require("../service/order");
const authenticated = require("../auth/check.auth")


router.get("/order", authenticated[0], order);



module.exports = router;