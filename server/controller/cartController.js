import { sequelize } from "../models/init-models";

const findcartsBySQL = async (req, res) => {
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

const findAllRows = async (req, res) => {
  try {
    const result = await req.context.models.carts.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRowById = async (req, res) => {
  try {
    const result = await req.context.models.carts.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

/*
const userCarts = async (req, res) => {
    try {
      const result = await req.context.models.carts.findAll({
        include : [{
          model : req.context.models.users
        }]
      });
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  };
*/

const createRow = async (req, res) => {
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

const updateRow = async (req, res) => {
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

const deleteRow = async (req, res) => {
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
  findcartsBySQL,
  findAllRows,
  findRowById,
  // userCarts,
  createRow,
  updateRow,
  deleteRow
};