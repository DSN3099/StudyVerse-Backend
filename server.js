import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoute from './Routes/auth.js'
import courseRoute from './Routes/course.js'
import lessonRoute from './Routes/lesson.js'
import userRoute from './Routes/user.js'
import reviewRoute from './Routes/Reviews.js'

const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB.")
    }
    catch (error) {
        throw error;
    }
}

mongoose.connection.on('dissconnected', () => {
    console.log("MongoDB disconnected")
})

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected")
})

const corsOption = {
    origin: 'https://studyverse.netlify.app',
    credentials: true
}

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(cors(corsOption));
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['studyVerse'],
    maxAge: 24 * 60 * 60 * 100
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoute)
app.use('/api/course', courseRoute)
app.use('/api/video', lessonRoute)
app.use('/api/user', userRoute)
app.use('/api/review', reviewRoute)


app.listen(5000, () => {
    connect();
    console.log('Server is running on port 5000');
})