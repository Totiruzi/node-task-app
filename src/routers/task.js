const express = require('express')
const { Tasks } = require('../model/task')

const router = new express.Router()

router.post('/tasks', async (req, res) => {
  const task = new Tasks(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send('Error!!! ', error);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router