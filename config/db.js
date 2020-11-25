const mongoose = require('mongoose');
const keys = require('./keys');
const db = keys.mongoURI;

const connectDB = async () => {
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

module.exports = connectDB;
