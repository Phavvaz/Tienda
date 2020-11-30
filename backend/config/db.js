import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_LOCAL, {
      user: process.env.DBUSER,
      pass: process.env.DBPASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const host = conn.connection.client.s.url.split('//')[1];
    console.log(`MongoDb connected: ${host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
