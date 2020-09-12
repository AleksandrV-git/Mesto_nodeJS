const express = require('express');
const routes = require('./routes.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
