import { sequelize } from "../models/init-models";

const findProductsBySQL = async (req, res) => {
  try {
    const result = await sequelize.query(
      "select prod_id,prod_name,prod_proce,prod_desc,prod_url_image,prod_rating,prod_view_count,prod_user_id,prod_cate_id from products",
      {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.products,
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
    const result = await req.context.models.products.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRowById = async (req, res) => {
  try {
    const result = await req.context.models.products.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createRow = async (req, res) => {
  try {
    const {
      prod_id,
      prod_name,
      prod_proce,
      prod_desc,
      prod_url_image,
      prod_rating,
      prod_view_count,
      prod_user_id,
      prod_cate_id,
    } = req.body;
    const result = await req.context.models.products.create({
      prod_id: prod_id,
      prod_name: prod_name,
      prod_proce: prod_proce,
      prod_desc: prod_desc,
      prod_url_image: prod_url_image,
      prod_rating: prod_rating,
      prod_view_count: prod_view_count,
      prod_user_id: prod_user_id,
      prod_cate_id: prod_cate_id,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateRow = async (req, res) => {
  try {
    const {
      prod_name,
      prod_proce,
      prod_desc,
      prod_url_image,
      prod_rating,
      prod_view_count,
      prod_user_id,
      prod_cate_id,
    } = req.body;
    const result = await req.context.models.products.update(
      {
        prod_name: prod_name,
        prod_proce: prod_proce,
        prod_desc: prod_desc,
        prod_url_image: prod_url_image,
        prod_rating: prod_rating,
        prod_view_count: prod_view_count,
        prod_user_id: prod_user_id,
        prod_cate_id: prod_cate_id,
      },
      { returning: true, where: { prod_id: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.products
    .destroy({
      where: { prod_id: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data Not Found");
    });
};

export default {
  findProductsBySQL,
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow,
};
