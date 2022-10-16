const router = require('express').Router();
const { Cart, Product, User, ProductCart } = require('../../models');
const { validateToken } = require('../../middleWares/AuthMiddlewares')

// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products
router.post('/createCart', validateToken, async (req, res) => {
  try {
    const cart = req.body;
    cart.user_id = req.user.id
    await Cart.create(cart)
    res.status(200).json(cart)
  } catch (err) {
    res.status(400).json(err)
  }
});


// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const cartData = await Cart.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!cartData) {
      res.status(404).json({ message: 'No tag found with this id!' })
      return;
    }
    res.status(200).json(cartData)
  } catch (err) {
    res.status(500).json(err);
  }
})

//add a product to a user shopping cart
router.post('/addtocart', validateToken, async (req, res) => {
   const cartProduct = [req.body.product_id];
   console.log(cartProduct)
   cart_id = req.user.id
   console.log(cart_id)
  // console.log(cartProduct, cart_id)
  console.log(req.body)
    try {
      const cartData = await ProductCart.bulkCreate(cartProduct, cart_id)
      res.status(200).json(cartData)
    } catch (err) {
      res.status(400).json(err)
    }
});

module.exports = router;
