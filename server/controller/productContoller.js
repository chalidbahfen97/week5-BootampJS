import { sequelize } from "../models/init-models";
import formidable from "formidable";
import fs from 'fs';
import path from "path";
import { from } from "responselike";
import { error } from "console";
import { fileURLToPath } from "url";

const findProductsBySQL = async (req, res) => {
  try {
    const result = await sequelize.query(
      `select prod_id,prod_name,prod_price,prod_desc,prod_url_image,
      prod_rating,prod_view_count,prod_user_id,prod_cate_id from products`,
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
  const uploadDir = process.cwd()+'/storages/';

  const options = {
    multiplies : true,
    keepExtensions : true,
    uploadDir : uploadDir,
    maxFileSize : 50 * 1024 * 1024
  }

  const form = formidable(options);

  form.onPart = function(part){
    if(!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)){
      this.handlePart(part)
    }else{
      form._error(new Error("File type is not supported"))
    }
  }

  form.parse(req,async(error,fields,files)=>{
    if(error){
      return res.status(400).json({
        status : "error",
        message : error.message,
        error : error.stack
      })
    }

    if(files.uploadFile.length > 1){
      return res.status(400).json({
        status : "error",
        message : "only one file allowed",
        error : null
      })
    }

    const uploadFile = files.uploadFile.path;
    const seq = path.sep;
    const urlImage = uploadFile.substr(uploadFile.lastIndexOf(seq),uploadFile.length).replace(seq,"");

    const atr = fields;

    try{
      const result = await req.context.models.products.create({
        prod_name : fields.prod_name,
        prod_price : fields.prod_price,
        prod_desc : fields.prod_desc,
        prod_url_image : urlImage,
        prod_rating : parseInt(fields.prod_rating),
        prod_view_count : parseInt(fields.prod_view_count),
        prod_user_id : parseInt(fields.prod_user_id),
        prod_cate_id : parseInt(fields.prod_cate_id),
        prod_stock : parseInt(fields.prod_stock)
      });
      return res.send(result);
    }catch (error){
      return res.status(404).json({
        status : "Failed",
        message : "",
        error : error
      })
    }
  })
}

const showProductImage = async (req,res) =>{
  const fileName = req.params.fileName;
  const url =`${process.cwd()}/${process.env.UPLOAD_DIR}/${fileName}`
  fs.createReadStream(url)
    .on(error,() => responseNotFound(req,res))
    .pipe(res);
}

function responseNotFound(req,res){
  res.writeHead(404,{"Content-Type" : "text/plain"});
  res.end("Not Found");
}

const updateRow = async (req, res) => {
  try {
    const {
      prod_name,
      prod_price,
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
        prod_price: prod_price,
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
  showProductImage,
  updateRow,
  deleteRow
};
