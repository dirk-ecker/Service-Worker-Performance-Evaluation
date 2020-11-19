const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/`));

app.use(express.static('public', {
  etag: true, // Just being explicit about the default.
  lastModified: true,  // Just being explicit about the default.
  setHeaders: (res, path) => {
    if (path.endsWith('.jpg')) {
      // All of the project's HTML files end in .html
      res.setHeader('Cache-Control', 'max-age=31536000');
    }
  },
}));

app.listen(port, () => {
    console.log("started on port 3000")
});