const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  age: {
    type: Number,
    default: 0,
    trim: true,
    validate(value) {
      if (value < 0) {
        throw new Error('Age should be a positive number');
      }
    },
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    trim: true,
    require: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password must not contain the word password');
      }
    },
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash('password', 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

// const legit = new User({
//   name: 'Bano',
//   age: '35',
//   email: 'frakego@lmail.com',
//   password: 'Balanko',
// });

// legit
//   .save()
//   .then((ligit) => {
//     console.log(legit, 'Successfuly saved!!!');
//   })
//   .then((error) => {
//     console.log('Error', error);
//   });
module.exports = User;
