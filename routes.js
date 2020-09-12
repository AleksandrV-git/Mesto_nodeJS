const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');


const pathToUsers = path.join(__dirname, './data/users.json');
const pathToCards = path.join(__dirname, './data/cards.json');
const usersJson = require(pathToUsers);
const cardsJson = require(pathToCards);


router.get('/:path', (req, res, next) => {
  if (req.params.path !== 'users' && req.params.path !== 'cards') {
    res.send({ message: 'Запрашиваемый ресурс не найден' });
    return;
}
next();
});
router.get('/users', (req, res) => {
  if (!usersJson) {
    res.send({ message: 'Запрашиваемый ресурс не найден' });
    return;
}
  res.send(usersJson);
});
router.get('/cards', (req, res) => {
  if (!cardsJson) {
    res.send({ message: 'Запрашиваемый ресурс не найден' });
    return;
}
  res.send(cardsJson);
});
router.get('/users/:id', (req, res) => {
  fs.readFile(pathToUsers, 'utf8')
  .then((users) => {
    const findUser = JSON.parse(users).find((user) => user._id === req.params.id);
    if (!findUser) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
  }
  res.send(findUser);
})
  .catch(() => {
    res.status('500').send({ message: 'Запрашиваемый ресурс не найден' });
  });
});

module.exports = router;
