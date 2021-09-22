import { sequelize } from "../models/init-models";

const findProductsBySQL = async(req,res)=>{
    try{
        const result = await sequelize.query(
            "select prod_id,prod_name,prod_proce,prod_desc,prod_url_image,prod_rating,prod_view_count,prod_user_id,prod_cate_id from products",{
                type : sequelize.QueryTypes.SELECT,
                model : req.context.models.products,
                mapToModel : true
            });
            return res.send(result);
            
        }catch(error){
            return res.send(error);
        }
    }


export default {
    findProductsBySQL
}