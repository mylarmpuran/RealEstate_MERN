import express from "express"
import test, { deleteUser, updatedUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verfyUser.js";

const router = express.Router();


router.get('/test', test);
router.post('/update/:id',verifyToken,updatedUser)
router.delete('/delete/:id',verifyToken,deleteUser)

export default router;