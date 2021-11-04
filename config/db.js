const mongoose = require('mongoose');

//const DB_URI = 'mongodb+srv://url:shorten@poligon.pnvbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;