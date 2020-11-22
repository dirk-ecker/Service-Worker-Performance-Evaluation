const express = require('express');
const app = express();
const port = 4001;

app.use(express.static(`${__dirname}/`, { maxAge: '1y' }));

app.listen(port, () => {
    console.log("started on port 4001")
});