import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { connectDB } from './utils/db';
import { protect } from './utils/auth';
import userRouter from './Resources/user/user.router';
import authRouter from './Resources/auth/auth.router';
import tweetRouter from './Resources/tweets/tweet.router';
import profileRouter from './Resources/profile/profile.router';

const app = express();

app.disable('x-powered-by');

//Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(
   fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      abortOnLimit: true,
   })
);
// app.use(bodyParser.json());

// Define Routes
app.get('/', (req, res) => {
   try {
      res.status(200).send('Server Running');
   } catch (err) {
      console.error(err.message);
      res.status(400).end();
   }
});
app.use('/auth', authRouter);
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/tweets', tweetRouter);
app.use('/api/profile', profileRouter);

const PORT = process.env.PORT || 5000;

export const start = async () => {
   try {
      await connectDB();
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch (err) {
      console.error(err.message);
   }
};
