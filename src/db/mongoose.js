const mongoose = require('mongoose');

const connectionURL = 'mongodb://localhost:27017/task-manager-api';
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});



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

// const meditation = new Tasks({
//   description: 'Meditating every morning before getting out of bed',
//   complete: false,
// });


// meditation
//   .save()
//   .then((meditation) => {
//     console.log(meditation, 'Saved successfully!!!');
//   })
//   .catch((error) => {
//     console.log('Error!!! ', error);
//   });

// const yo = new User({
//   name: 'Oyemechi',
//   age: 47
// })

// yo.save().then((response) => {
//   console.log(response, 'Saved Succefully!!!')
// }).catch(() => {
//   console.log('Error!!', error)
// })
