const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
    username: 'MichaelScott'
  },
  {
    category_name: 'Shorts',
    username: 'MichaelScott'
  },
  {
    category_name: 'Music',
    username: 'MichaelScott'
  },
  {
    category_name: 'Hats',
    username: 'MichaelScott'
  },
  {
    category_name: 'Shoes',
    username: 'MichaelScott'
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
