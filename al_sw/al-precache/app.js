
const express = require('express');
const app = express();
const port = 4000;

app.use(express.static(`${__dirname}/`));

app.listen(port, () => {
    console.log("started on port 4000")
});

  