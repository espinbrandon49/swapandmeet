const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const usersRoutes = require('./Users');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/auth', usersRoutes)
router.use('/tags', tagRoutes);

module.exports = router;
