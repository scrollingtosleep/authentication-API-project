const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://shivambitm2:DEitxbv2ofHdZ4Oa@cluster0.adf8ncd.mongodb.net/your-database-name?retryWrites=true&w=majority', {
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };