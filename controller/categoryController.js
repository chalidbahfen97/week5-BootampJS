import { sequelize } from "../models/init-models";

const findCategoryBySQL = async(req,res)=>{
    try{
        const result = await sequelize.query("select cate_id,cate_name from category",{
            type : sequelize.QueryTypes.SELECT,
            model : req.context.models.category,
            mapToModel : true
        });
        return res.send(result);
        
    }catch(error){
        return res.send(error);
    }
}


export default {
    findCategoryBySQL
}