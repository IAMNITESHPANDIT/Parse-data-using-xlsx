const express = require('express');

const path = require('path');

const dotenv = require('dotenv');

const { connectDb } = require('./connection');

const csvRoute = require('./route/csvRoutes');

const app = express();

dotenv.config();

connectDb();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/data', csvRoute);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broken');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
