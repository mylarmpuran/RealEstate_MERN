import { createListing, deleteListing, getListing, getListings, updateListing } from "../controllers/listing.controller.js";
import express from "express"
import { verifyToken } from "../utils/verfyUser.js";



const router = express.Router();


router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing)
router.delete('/update/:id', verifyToken, updateListing)
router.get('/get/:id', getListing)
router.get('/get', getListing)
router.get('/get',getListings)

export default router;