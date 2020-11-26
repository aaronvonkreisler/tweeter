const express = require('express');
import { connectDB } from './config/db';

const app = express();

//Middleware
app.use(express.json({ extended: false }));

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
