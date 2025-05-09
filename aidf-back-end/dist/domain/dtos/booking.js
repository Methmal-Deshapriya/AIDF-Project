"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createbookingDTO = void 0;
const zod_1 = require("zod");
exports.createbookingDTO = zod_1.z.object({
    hotelId: zod_1.z.string(),
    hotelName: zod_1.z.string(),
    totalPrice: zod_1.z.number(),
    nights: zod_1.z.number(),
    checkIn: zod_1.z.string(),
    checkOut: zod_1.z.string(),
});
//# sourceMappingURL=booking.js.map