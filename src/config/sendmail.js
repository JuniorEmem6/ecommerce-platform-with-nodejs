const nodemailer = require("nodemailer");
const client = require("./redis-connect");

module.exports = sendMail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "simplyemem10@gmail.com",
      pass: "eydrkmacfgwkbxwu",
    },
  });

  const token = require("generate-six-digit-readable-code")();

  const mailOptions = {
    from: "simplyemem10@gmail.com",
    to: req.body.email,
    subject: "Sending Email using Node.js",
    html: `<h1>That was easy! Your token is ${token}</h1>`,
  };

  const ok = await client.setEx(token, 30, req.body.email);
  console.log(ok);
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res.status(201).json({
    status: "ok",
    message: "Account created, check your mail for confimation token",
  });
};
