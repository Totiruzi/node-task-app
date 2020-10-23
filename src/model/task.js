const mongoose = require('mongoose');

const Tasks = mongoose.model('Tasks', {
  description: {
    type: String,
    require: true,
    trim: true
  },
  complete: {
    type: Boolean,
    default: false
  },
});

module.exports = { Tasks }