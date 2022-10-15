const router = require('express').Router();
const { Cart, Product, User } = require('../../models');
const { validateToken } = require('../../middleWares/AuthMiddlewares')

// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products
router.post('/createCart', validateToken, async (req, res) => {
  try {
    const cart = req.body;
    cart.user_id = req.user.id
    await Cart.create(cart)
    // res.status(200).json(category)

    res.status(200).json(cart)
  } catch (err) {
    res.status(400).json(err)
  }
});


// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const cart = await Cart.findAll({
    include: [{ model: Product }],
    where: {user_id: id}
  })
  res.json(cart)
})

module.exports = router;
