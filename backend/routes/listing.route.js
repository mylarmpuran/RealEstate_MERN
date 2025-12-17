import { createListing, deleteListing } from "../controllers/listing.controller.js";
import express from "express"
import { verifyToken } from "../utils/verfyUser.js";



const router = express.Router();


router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing)

export default router;