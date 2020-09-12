const express = require('express');
const path = require('path');
const routeCards = require('./routes/cards.js');
const routeUsers = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

const errReqHandler = (req, res, next) => {
  if (req.params.path !== 'users' && req.params.path !== 'cards') {
    res.status('500').send({ message: 'Запрашиваемый ресурс не найден' });
    return;
  }
  next();
};

app.use(express.static(path.join(__dirname, '../public')));
app.use('/:path', errReqHandler);
app.use('/', routeCards);
app.use('/', routeUsers);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
