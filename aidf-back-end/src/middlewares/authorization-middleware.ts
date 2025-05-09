import e, { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../domain/errors/forbidden-error";
import { WithAuthProp } from "@clerk/clerk-sdk-node";

export type AuthenticatedRequest = WithAuthProp<Request>;

const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.auth?.sessionClaims?.metadata?.role !== "admin") {
    throw new ForbiddenError("Forbidden");
  }
  next();
};

export default isAdmin;
