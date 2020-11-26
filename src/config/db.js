import mongoose from 'mongoose';
import keys from './keys';
const db = keys.mongoURI;

export const connectDB = async () => {
   try {
      await mongoose.connect(db, {
         useCreateIndex: true,
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useFindAndModify: false,
      });

      console.log('MongoDB Connected...');
   } catch (err) {
      console.error(err.message);
      process.exit(1);
   }
};
