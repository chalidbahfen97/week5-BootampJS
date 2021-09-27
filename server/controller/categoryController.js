import { sequelize } from "../models/init-models";

const findCategoryBySQL = async (req, res) => {
  try {
    const result = await sequelize.query(
      "select cate_id,cate_name from category",
      {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.category,
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
    const result = await req.context.models.category.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const cateProducts = async (req, res) => {
  try {
    const result = await req.context.models.category.findAll({
      include : [{
        model : req.context.models.products
      }]
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRowById = async (req, res) => {
  try {
    const result = await req.context.models.category.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createRow = async (req, res) => {
  try {
    const { cate_id, cate_name } = req.body;
    const result = await req.context.models.category.create({
      cate_id: cate_id,
      cate_name: cate_name,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateRow = async (req, res) => {
  try {
    const { cate_name } = req.body;
    const result = await req.context.models.category.update(
      { cate_name: cate_name },
      { returning: true, where: { cate_id: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.category
    .destroy({
      where: { cate_id: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data Not Found");
    });
};

export default {
  findCategoryBySQL,
  findAllRows,
  cateProducts,
  findRowById,
  createRow,
  updateRow,
  deleteRow
};