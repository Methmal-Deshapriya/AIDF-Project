"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const hotel_1 = __importDefault(require("./api/hotel"));
const db_1 = __importDefault(require("./infrastructure/db"));
// import userRouter from "./api/user";
const booking_1 = __importDefault(require("./api/booking"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@clerk/express");
const global_error_handling_middleware_1 = __importDefault(require("./middlewares/global-error-handling-middleware"));
const app = (0, express_1.default)();
app.use((0, express_2.clerkMiddleware)());
//Middleware to parse JSON - set json to the req.body property
app.use(express_1.default.json());
//To allow cross-origin requests
app.use((0, cors_1.default)({ origin: "https://aidf-front-end-methmal.netlify.app/" }));
//Connect to the database
(0, db_1.default)();
app.use("/api/hotel", hotel_1.default);
// app.use("/api/user", userRouter);
app.use("/api/booking", booking_1.default);
app.use(global_error_handling_middleware_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
//
//# sourceMappingURL=index.js.map