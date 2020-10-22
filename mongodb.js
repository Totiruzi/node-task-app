const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    // db.collection('tasks').findOne({communication: 'Talk with everybody with a sense of appreciation and love'}, (error, tasks) => {
    //   if (error) {
    //     console.log('Could not find task!!')
    //   }

    //   console.log(tasks)
    // }),

    // db.collection('tasks').find({done: true}).toArray((error, tasks) => {
    //   console.log(tasks)
    // })

    // db.collection('tasks').find({done: true}).count((error, count) => {
    //   console.log(count)
    // })

    // const updateProms = db.collection('users').updateOne({_id: new ObjectID('5f8e9497f179d33597e44d24')}, {$set: { age: 33}})

    // updateProms.then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log('Error!', error)
    // })

    // db.collection('tasks').updateMany({done: false},{$set:{done: true}}).then(result => {
    //   console.log(result)
    // }).catch(error => {
    //   console.log('Error!!', error)
    // })

    db.collection('tasks')
      .deleteOne({
        description: 'Read and study and continue a progrmming language',
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('Error!!', error);
      });
  }
);
