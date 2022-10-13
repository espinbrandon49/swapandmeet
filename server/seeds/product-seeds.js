const { Product } = require('../models');

const productData = [
  {
    product_name: 'Plain T-Shirt',
    username: 'bambino1',
    price: 14.99,
    stock: 14,
    categoryName: "Army",
    category_id: 1,
  },
  {
    product_name: 'Colorful T-Shirt',
    username: 'bambino1',
    price: 18.99,
    stock: 2,
    categoryName: "Army",
    category_id: 1,
  },
  {
    product_name: 'Running Sneakers',
    username: 'bambino1',
    price: 90.0,
    stock: 25,
    categoryName: "Army",
    category_id: 5,
  },
  {
    product_name: 'Branded Baseball Hat',
    username: 'bambino1',
    price: 22.99,
    stock: 12,
    categoryName: "Army",
    category_id: 4,
  },
  {
    product_name: 'Top 40 Music Compilation Vinyl Record',
    username: 'bambino1',
    price: 12.99,
    stock: 50,
    categoryName: "Army",
    category_id: 3,
  },
  {
    product_name: 'Cargo Shorts',
    username: 'bambino1',
    price: 29.99,
    stock: 22,
    categoryName: "Army",
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
