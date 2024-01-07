const express = require('express');
const cors = require('cors');
const redditController = require('./redditController');

const app = express();
const port = 3000;

app.use(cors());
app.use('/api', redditController);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});