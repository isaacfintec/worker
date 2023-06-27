import mongoose from 'mongoose';

const config = {
  useNewUrlParser: true,
  connectTimeoutMS: 300000,
  socketTimeoutMS: 30000,
};

const { MONGODB: URL } = process.env;

mongoose.connect(<string>URL, config);
mongoose.set('debug', false);
mongoose.Promise = global.Promise;

export const db = mongoose.connection;

db.on('connected', function () {
  console.log(URL);
  console.log('Mongoose default connection open');
});

db.on('reconnected', () => {
  console.log('Mongoose default connection reconnected');
});

db.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});
