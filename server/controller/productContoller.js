import { sequelize } from "../models/init-models";
import formidable from "formidable";
import fs from 'fs';
import path from "path";
import { from } from "responselike";
import { error } from "console";
import { fileURLToPath } from "url";
import upDowloadHelper from "../helpers/upDowloadHelper";

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

const updateRow = async (req, res) => {
  try {
    const singlePart = await upDowloadHelper.uploadSingleFile(req);
    const {attr:{file,fields,filename},status : {status}} = singlePart;
    if (status === `succeed`) {
      try {
        const result = await req.context.models.products.update({
          prod_name : fields.prod_name,
          prod_price : fields.prod_price,
          prod_desc : fields.prod_desc,
          prod_url_image : filename,
          prod_rating : parseInt(fields.prod_rating),
          prod_view_count : parseInt(fields.prod_view_count),
          prod_user_id : parseInt(fields.prod_user_id),
          prod_cate_id : parseInt(fields.prod_cate_id),
          prod_stock : parseInt(fields.prod_stock)
        },
        {returning : true, where : {prod_id : parseInt(req.params.id)} }
        );

        return res.send(result);

      } catch (error) {
        return res.sendStatus(404).send(error);
      }
    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
}

const createProductImage =  async (req,res,next) =>{
  try {
    const multiPart = await upDowloadHelper.uploadMultipleFile(req);
    const {attr:{files,fields},status : {status}} = multiPart;
    try {
      const result = await req.context.models.products.create({
        prod_name : fields.prod_name,
        prod_price : fields.prod_price,
        prod_desc : fields.prod_desc,
        prod_url_image : "",
        prod_rating : parseInt(fields.prod_rating),
        prod_view_count : parseInt(fields.prod_view_count),
        prod_user_id : parseInt(fields.prod_user_id),
        prod_cate_id : parseInt(fields.prod_cate_id),
        prod_stock : parseInt(fields.prod_stock)
      });

      req.prodId = result.dataValues.prod_id;
      req.files = files;
      next();

      return res.send(result);

    } catch (error) {
      
    }
    console.log();
  } catch (error) {
    
  }
}


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
  createProductImage,
  deleteRow
};
