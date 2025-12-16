import { createListing } from "../controllers/listing.controller.js";
import express from "express"
import { verifyToken } from "../utils/verfyUser.js";



const router = express.Router();


router.post('/create', verifyToken, createListing)

export default router;