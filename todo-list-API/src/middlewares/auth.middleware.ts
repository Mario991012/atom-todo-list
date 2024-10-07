import {Request, Response, NextFunction} from "express";
import {auth} from "../config/firebase.config";
import {logger} from "firebase-functions/v2";
/**
 * Middleware to verify Firebase token.
 */
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({message: "No token provided"});
    return;
  }

  try {
    await auth.verifyIdToken(token);
    next();
  } catch (error: any) {
    logger.error("Error while verifying token", error);
    if (error.code === "auth/id-token-expired") {
      res
        .status(401)
        .json({message: "Token expired. Please refresh and try again."});
    }
    res.status(401).json({message: "Invalid or expired token"});
  }
};

export default verifyToken;
