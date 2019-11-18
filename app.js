const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'ConnectWW' });
});

app.post('/', (req, res) => {
  res.send('Post endpoint');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
