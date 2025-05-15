import Hotel from "../infrastructure/schemas/Hotel";
import Booking from "../infrastructure/schemas/Booking";
import { Request, Response, NextFunction } from "express";
import stripe from "../infrastructure/stripe";

const FRONTEND_URL = process.env.FRONTEND_URL;

// handler function to create a checkout session
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const bookingId = req.body.bookingId;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    const hotel = await Hotel.findById(booking.hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }

    const checkIn = booking.checkIn;
    const checkOut = booking.checkOut;
    const nights = booking.nights;

    if (!hotel.stripePriceId) {
      throw new Error("Stripe price ID not found for this hotel");
    }

    // create a checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: hotel.stripePriceId,
          quantity: nights,
        },
      ],
      mode: "payment",
      return_url: `${FRONTEND_URL}/booking/complete?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        bookingId: req.body.bookingId,
      },
    });

    res.send({ clientSecret: session.client_secret });
    return;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({
      message: "Failed to create checkout session",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
