import express from "express"
import test, { updatedUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verfyUser.js";

const router = express.Router();


router.get('/test', test);
router.post('/update/:id',verifyToken,updatedUser)

export default router;