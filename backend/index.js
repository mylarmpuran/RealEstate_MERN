import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to MongoDB!');
})
.catch((err) =>  {
    console.log(err);
})


const app = express();
app.use(express.json());
app.use(cors({credentials: true}))
app.use(cookieParser())

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!!!!`);
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})