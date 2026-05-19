// Simple protect/authorize middleware placeholders.
// To be replaced with real auth logic (JWT/session/roles) as needed.

exports.protect = (req, res, next) => {
  // Add JWT, validate it here.
  return next();
};

exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Add role-based access control here.
    return next();
  };
};

