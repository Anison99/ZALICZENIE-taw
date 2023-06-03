const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// Połączenie z bazą danych MongoDB
mongoose.connect('mongodb://localhost:27017/tasksdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Middlewares
app.use(bodyParser.json());

// Routery
const resourceRouter = require('./routes/resourceRouter');
const userRouter = require('./routes/userRouter');
app.use('/api/resources', resourceRouter);
app.use('/api/users', userRouter);

// Uruchomienie serwera
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
