const mongoose = require('mongoose');

// definicja struktury modelu zasobu z użyciem Mongoose

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resource', resourceSchema);

// ------ MODEL DANYCH DLA ZASOBÓW ------