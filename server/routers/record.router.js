const express = require('express');

// Have express make me a new Router
const router = express.Router();

// Make some records
const Record = require('../modules/record.schema');
// const recordArray = [
//   // new Record('Beatles', 'Abbey Road', 1969, ['Rock']),
//   // new Record('Michael Jackson', 'Off the Wall', 1979, ['Pop']),
//   // new Record('Prince', 'Purple Rain', 1984, ['Pop']),
//   // new Record('Cibo Matto', 'Viva la Woman', 1990, ['Jpop'])
// ];

router.get('/', (req, res) => {
  Record.find()
  .then( (data) => {
    // We got stuff back from the database (no error)
    console.log(`Got stuff back from mongo: ${data}`);
    res.send(data)
  })
  .catch( (error) => {
    // Got and error from database
    console.log(`Error from mongo: ${error}`);
    res.sendStatus(500); // Status for bad stuff happened
  })
});

router.post('/', (req, res) => {
  let sentRecord = req.body;
  console.log(`Got the new record data from request: ${recordData}`);
  
  // I could make 100% sure the objects are exactly the same
  // on the client and server, or I could just assume they 
  // may not be and set all the values again.  Nice if you 
  // aren't the one writing the code on both sides.
  let newRecord = new Record(recordData);
  console.log(`New record is ${newRecord}`);
  // Save the new record model to the database
  newRecord.save()
  .then(() => {
    // good servers always respond
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log(`Error adding book: ${error}`);
    res.sendStatus(500);
  });
});

router.delete('/', (req, res) => {
  let recordId = req.query._id;
  console.log(`Id for request is ${recordId}`);
  Record.findByIdAndRemove(recordId)
  .then(() => {
    // good servers always respond. Say OK
    console.log(`Removed book ${recordId}`);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(`Error removing record: ${error}`);
    res.sendStatus(500);
  });
});

module.exports = router;