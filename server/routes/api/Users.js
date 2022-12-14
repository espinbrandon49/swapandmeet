const router = require('express').Router();
const { Users, Product, Category } = require("../../models");
const bcrypt = require('bcrypt');
const { validateToken } = require("../../middleWares/AuthMiddlewares")
const { sign } = require('jsonwebtoken')

//create user
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      image: req.body.image
    })
    res.json('SUCCESS')
  });
});

//user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "User doesn't exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) return res.json({ error: 'Wrong username and password combination' })

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
})

router.get('/auth', validateToken, (req, res) => {
  res.json(req.user)
});

router.get('/basicinfo/:id', async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ['password'] },
  })
  res.json(basicInfo)
})

// update a username(shopname) by its `id` value
router.put("/changeusername", validateToken, async (req, res) => {
  const { newUsername, uid, pid, cid } = req.body;
  try {
    await Users.update(
      { username: newUsername },
      { where: { id: uid } }
    );
    await Product.update(
      { username: newUsername },
      { where: { id: pid } }
    );
    await Category.update(
      { username: newUsername },
      { where: { id: cid } }
    );
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
