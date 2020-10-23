const express = require('express');
require('./db/mongoose');
const User = require('./model/user');
const { Tasks } = require('./model/task');

const app = express();
const port = process.env.port || 3001;

app.use(express.json());

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((error) => {
      res.statu(400).send('Error!! ', error);
    });
});

app.post('/tasks', (req, res) => {
  const task = new Tasks(req.body);
  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((error) => {
      res.status(400).send('Error!!! ', error);
    });
});

app.listen(port, () => {
  console.log(`The Server is running on port ${port}`);
});
