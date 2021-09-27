const DataTypes = require("sequelize").DataTypes;
const _carts = require("./carts");
const _category = require("./category");
const _line_items = require("./line_items");
const _orders = require("./orders");
const _product_images = require("./product_images");
const _products = require("./products");
const _users = require("./users");

function initModels(sequelize) {
  const carts = _carts(sequelize, DataTypes);
  const category = _category(sequelize, DataTypes);
  const line_items = _line_items(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const product_images = _product_images(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  products.belongsTo(category, { as: "prod_cate", foreignKey: "prod_cate_id"});
  category.hasMany(products, { as: "products", foreignKey: "prod_cate_id"});
  product_images.belongsTo(products, { as: "prim_prod", foreignKey: "prim_prod_id"});
  products.hasMany(product_images, { as: "product_images", foreignKey: "prim_prod_id"});
  carts.belongsTo(users, { as: "cart_user", foreignKey: "cart_user_id"});
  users.hasMany(carts, { as: "carts", foreignKey: "cart_user_id"});
  orders.belongsTo(users, { as: "order_user", foreignKey: "order_user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "order_user_id"});
  products.belongsTo(users, { as: "prod_user", foreignKey: "prod_user_id"});
  users.hasMany(products, { as: "products", foreignKey: "prod_user_id"});

  return {
    carts,
    category,
    line_items,
    orders,
    product_images,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
