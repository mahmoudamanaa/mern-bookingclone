import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Not Authenticated."));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(err);
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.userId === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Not Autherized."));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Not Admin."));
    }
  });
};
