const express = require('express');
const app = express();
const port = 4000;

app.use(express.static(`${__dirname}/`));

app.use(express.static('public', {
    etag: true, // Just being explicit about the default.
    lastModified: true,  // Just being explicit about the default.
    setHeaders: (res, path) => {
      if (path.endsWith('.jpg')) {
        // All of the project's HTML files end in .html
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }));

app.listen(port, () => {
    console.log("started on port 4000")
});