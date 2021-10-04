import { sequelize } from "../models/init-models";

const findCartsBySQL = async (req, res) => {
  try {
    const result = await sequelize.query(
      "select cart_id, cart_createdon, cart_status, cart_user_id from carts",
      {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.carts,
        mapToModel: true,
      }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findCartRows = async (req, res) => {
  try {
    const result = await req.context.models.carts.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findCartRowsById = async (req, res) => {
  try {
    const result = await req.context.models.carts.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};


const createCarts = async (req, res) => {
  try {
    const { cart_id, cart_createdon, cart_status, cart_user_id } = req.body;
    const result = await req.context.models.carts.create({
      cart_id : cart_id,
      cart_createdon : cart_createdon,
      cart_status : cart_status,
      cart_user_id : cart_user_id
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createLineItems = async (req, res) =>{
  try {
    const {lite_prod_id , lite_cart_id, lite_qty, lite_price, lite_total_price, lite_status, lite_order_name} = req.body;
    const result = await req.context.models.line_items.create({
      lite_prod_id : lite_prod_id,
      lite_cart_id : lite_cart_id,
      lite_qty : lite_qty,
      lite_price : lite_price,
      lite_total_price : lite_total_price,
      lite_status : lite_status,
      lite_order_name : lite_order_name
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const createOrder = async (req, res) =>{
  try {
    const {order_name, order_created_on, order_subtotal, order_discount, order_tax, order_total_due, order_total_qty, order_trx_number, 
      order_city, order_address, order_status, order_user_id} = req.body;
    const result = await req.context.models.line_items.create({
      order_name : order_name,
      order_created_on : order_created_on,
      order_subtotal : order_subtotal,
      order_discount : order_discount,
      order_tax : order_tax,
      order_total_due : order_total_due,
      order_total_qty : order_total_qty,
      order_trx_number : order_trx_number,
      order_city : order_city,
      order_address : order_address,
      order_status : order_status,
      order_user_id : order_user_id
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const liteCarts = async (req, res) => {
  try {
    const result = await req.context.models.carts.findAll({
      include : [{
        model : req.context.models.line_items
      }]
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateCarts = async (req, res) => {
  try {
    const { cart_createdon, cart_status, cart_user_id } = req.body;
    const result = await req.context.models.carts.update(
      { cart_createdon : cart_createdon,
        cart_status : cart_status,
        cart_user_id : cart_user_id
    },
      { returning: true, where: { cart_id: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteCarts = async (req, res) => {
  const id = req.params.id;
  await req.context.models.carts
    .destroy({
      where: { cart_id: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data Not Found");
    });
};

export default {
  findCartsBySQL,
  findCartRows,
  findCartRowsById,
  createCarts,
  createLineItems,
  createOrder,
  liteCarts,
  updateCarts,
  deleteCarts
};