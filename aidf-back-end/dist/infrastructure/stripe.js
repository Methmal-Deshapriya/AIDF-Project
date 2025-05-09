"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = require("stripe");
const stripe = new stripe_1.Stripe(process.env.STRIPE_SECRET_KEY);
exports.default = stripe;
//# sourceMappingURL=stripe.js.map