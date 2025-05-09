import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../domain/errors/unauthorized-error";
import { log } from "console";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

export type AuthenticatedRequest = WithAuthProp<Request>;

const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req?.auth?.userId) {
    throw new UnauthorizedError("Unauthorized");
  }

  next();
};

export default isAuthenticated;
