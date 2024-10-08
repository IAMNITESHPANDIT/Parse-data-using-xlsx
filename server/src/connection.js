const mongoose = require('mongoose');
const { DynamicData } = require('./models/csv');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
    insertDummyData();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const insertDummyData = async () => {
  try {
    const dummyData = [
      { name: 'John dev', age: 30, email: 'dev@example.com', address: '123 Main St' },
      { name: 'Code Smith', age: 25, email: 'Code@example.com', address: '456 Elm St' },
      { name: 'harideep', age: 40, email: 'Hd@example.com', address: '789 Oak St' }
    ];

    for (const data of dummyData) {
      const existingRecord = await DynamicData.findOne({ email: data.email });

      if (existingRecord) {
        console.log(`Duplicate data found: ${data.email}. Skipping insertion.`);
      } else {
        await DynamicData.create(data);
      }
    }
  } catch (err) {
    console.error('Error inserting dummy data:', err);
  }
};

module.exports = { connectDb };
