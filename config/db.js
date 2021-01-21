//where we connect to mongo DB
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//Set some connection parameters to use in connectDB
// because some other stuff is depreacated and i got errors
const mongooseParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const connectDB = async () => {
  try {
    await mongoose.connect(db, mongooseParams);

    console.log('Mongo DB connected');
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
