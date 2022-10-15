// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const Users = require('./Users');
const Cart = require('./Cart');
const ProductCart = require('./ProductCart')
const { hasOne } = require('./Cart');

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

Users.hasOne(Cart, {
  foreignKey: 'user_id',
})

// Cart belongsTo User
Cart.belongsTo(Users, {
  foreignKey: 'user_id',
});

// // Cart have many Products
// Cart.hasMany(Product, {
//   onDelete: 'cascade'
// })

// Product belongToMany Cart (through CartTag)
Product.belongsToMany(Cart, {
  through: ProductCart,
  foreignKey: 'product_id',
})

Cart.belongsToMany(Product, {
  through: ProductCart,
  foreignKey: 'cart_id',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  Users,
  Cart
};
