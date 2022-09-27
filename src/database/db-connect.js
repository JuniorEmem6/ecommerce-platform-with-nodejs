const mysql = require("mysql");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Patience10();",
  database: "ecommerce",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Mysql Database Connected....");
  }
});

const insertCustomer = (data, hashedPassword, res) => {
  db.query(
    "SELECT email FROM customers WHERE email = ?",
    [data.email],
    (err, result) => {
      if (err)
        return res.status(500).json({
          status: 1,
          message: "Internal Server Error",
        });

      if (result.length > 0) {
        return res.status(400).json({
          status: 1,
          message: "User with email exist",
        });
      }

      db.query(
        "INSERT INTO customers SET ?",
        [
          {
            name: data.name,
            phone: data.phone,
            email: data.email,
            password: hashedPassword,
          },
        ],
        (err) => {
          if (err)
            return res.status(500).json({
              status: 1,
              message: "Internal Server Error",
            });
        }
      );
    }
  );
};

const selectCustomer = (email, password, session, res) => {
  db.query(
    "SELECT email, password FROM customers WHERE email = ?",
    [email],
    async (err, result) => {
      if (err)
        return res.status(500).json({
          status: 1,
          message: "Internal Server Error",
        });

      if (result.length == 0)
        return res.status(404).json({
          status: 1,
          message: "No user with this email",
        });

      try {
        if (await bcrypt.compare(password, result[0].password)) {
          session.email = result[0].email;

          res.status(200).json({
            status: "ok",
            message: "You have successfully logged in",
            data: session,
          });
        } else {
          return res.status(401).json({
            status: 1,
            message: "Password is incorrect",
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: 1,
          message: "Internal Server Error",
        });
      }
    }
  );
};

module.exports = [insertCustomer, selectCustomer];
