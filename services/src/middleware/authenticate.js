const { StatusCodes } = require("http-status-codes");
const { verifyToken } = require("../utils/token.js");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Authorization header is required.",
    });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid authorization format.",
    });
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid or expired token.",
    });
  }
}

module.exports = authenticate;
