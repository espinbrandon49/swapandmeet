// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const Users = require('./Users');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Product
Category.hasMany(Product, {
  foreignKey: 'category_id',
})

// Product belongToMany Tag (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
})

// Tag belongToMany Product (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
})

// Users have many Product
Users.hasMany(Product, {
  onDelete: 'cascade'
})

// Users have many Categories
Users.hasMany(Category, {
  onDelete: 'cascade'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  Users
};
