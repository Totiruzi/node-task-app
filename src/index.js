const express = require('express');
require('./db/mongoose');
const User = require('./model/user');
const { Tasks } = require('./model/task');

const app = express();
const port = process.env.port || 3001;

app.use(express.json());

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

app.patch('/users/:id', async (req, res) => {
  // Checking if value to update is part of the object key
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'age', 'password'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  const _id = req.params.id;
  const dataUpdate = req.body;
  try {
    const user = await User.findByIdAndUpdate(_id, dataUpdate, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(400).send();
    }
    res.send('Delete Succefully!!!');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Tasks(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send('Error!!! ', error);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Tasks.findById(_id);
    if (!task) {
      return res.status(400).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const updatebleValues = ['description', 'complete'];
  const isValidOperation = updates.every((update) =>
    updatebleValues.includes(update)
  );

  if (!isValidOperation) {
    return res.send({ error: 'Invalid update' });
  }
  const _id = req.params.id;
  const dataUpdate = req.body;

  try {
    const task = await Tasks.findByIdAndUpdate(_id, dataUpdate, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(400).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Tasks.findByIdAndDelete(_id);
    if (!task) {
      return res.status(400).send();
    }
    res.send('Deleted Task successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`The Server is running on port ${port}`);
});
