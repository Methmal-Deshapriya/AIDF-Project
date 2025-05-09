"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotel_1 = require("../application/hotel");
const embeddings_1 = require("../application/embeddings");
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication-middleware"));
const authorization_middleware_1 = __importDefault(require("../middlewares/authorization-middleware"));
const retrieve_1 = require("../application/retrieve");
const hotelsRouter = express_1.default.Router();
hotelsRouter.get("/", hotel_1.getAllHotels);
hotelsRouter.get("/:id", hotel_1.getHotelById);
hotelsRouter.post("/", authentication_middleware_1.default, authorization_middleware_1.default, hotel_1.addHotel);
hotelsRouter.delete("/:id", hotel_1.deleteHotel);
hotelsRouter.put("/:id", hotel_1.updateHotel);
hotelsRouter.post("/embeddings/create", embeddings_1.createEmbeddings);
hotelsRouter.get("/search/retrieve", retrieve_1.retrieveByQuery);
exports.default = hotelsRouter;
//# sourceMappingURL=hotel.js.map