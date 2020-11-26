import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';

const app = express();

app.disable('x-powered-by');

//Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Tweeter API Running'));

// Define Routes

app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

export const start = async () => {
   try {
      await connectDB();
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch (err) {
      console.error(err.message);
   }
};
