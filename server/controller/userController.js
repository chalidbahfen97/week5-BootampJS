import { sequelize } from "../models/init-models";

const findUsersBySQL = async (req, res) => {
  try {
    const result = await sequelize.query(
      "select user_id, user_name, user_firstname, user_lastname, user_email, user_password, user_phone from users",
      {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.users,
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
    const result = await req.context.models.users.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRowById = async (req, res) => {
  try {
    const result = await req.context.models.users.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createRow = async (req, res) => {
  try {
    const { user_id, user_name, user_firstname, user_lastname, user_email, user_password, user_phone } = req.body;
    const result = await req.context.models.users.create({
      user_id : user_id,
      user_name : user_name,
      user_firstname : user_firstname,
      user_lastname : user_lastname,
      user_email : user_email,
      user_password : user_password,
      user_phone : user_phone
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateRow = async (req, res) => {
  try {
    const { user_name, user_firstname, user_lastname, user_email, user_password, user_phone } = req.body;
    const result = await req.context.models.users.update(
      { user_name: user_name, 
        user_firstname : user_firstname,
        user_lastname : user_lastname,
        user_email : user_email,
        user_password : user_password,
        user_phone : user_phone
    },
      { returning: true, where: { user_id: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.users
    .destroy({
      where: { user_id: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data Not Found");
    });
};

export default {
  findUsersBySQL,
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow
};