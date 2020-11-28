import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/db';
import { protect } from './utils/auth';
import userRouter from './Resources/user/user.router';
import authRouter from './Resources/auth/auth.router';
import tweetRouter from './Resources/tweets/tweet.router';

const app = express();

app.disable('x-powered-by');

//Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/auth', authRouter);
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/tweets', tweetRouter);

const PORT = process.env.PORT || 5000;

export const start = async () => {
   try {
      await connectDB();
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch (err) {
      console.error(err.message);
   }
};
