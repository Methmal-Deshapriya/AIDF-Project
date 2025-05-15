import { createCheckoutSession } from "../application/payment";
import express from "express";
import isAuthenticated from "../middlewares/authentication-middleware";
const paymentRouter = express.Router();

paymentRouter.post(
  "/create-checkout-session",
  isAuthenticated,
  createCheckoutSession
);

export default paymentRouter;
