import Sequelize from "sequelize";

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect : "postgres",
      pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000,
      }
    }
)


var DataTypes = require("sequelize").DataTypes;
var _carts = require("./carts");
var _category = require("./category");
var _line_items = require("./line_items");
var _orders = require("./orders");
var _product_images = require("./product_images");
var _products = require("./products");
var _users = require("./users");

const models =()=> {
  var carts = _carts(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var line_items = _line_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

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

export default models;
export {sequelize};


/*
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
*/