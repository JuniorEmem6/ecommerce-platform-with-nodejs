const checkIfAuthenticated = (req, res, next) => {
  if (req.session.email) {
    return next();
  } else {
    if (req.url == "/logout")
      return res.status(400).json({
        status: 1,
        message: "You are not logged in",
      });

    return res.status(401).json({
      status: 1,
      message: "You are not authorized to view this resource, log in to view",
    });
  }
};

const checkIfNotAuthenticated = (req, res, next) => {
  if (!req.session.email) return next();

  return res.status(401).json({
    status: 1,
    message: "You are aleady logged in",
  });
};

module.exports = [checkIfAuthenticated, checkIfNotAuthenticated]
