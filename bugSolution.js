const express = require('express');
const { Worker } = require('worker_threads');
const app = express();
app.get('/', (req, res) => {
  const worker = new Worker('./longTask.js');
  worker.on('message', (result) => {
    res.send(result);
  });
  worker.on('error', (err) => {
    res.status(500).send('Error processing request');
    console.error(err);
  });
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
// longTask.js
setTimeout(() => {
  postMessage('Hello from worker thread!');
}, 5000);