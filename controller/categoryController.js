import { sequelize } from "../models/init-models";

const findCategoryBySQL = async(req,res)=>{
    const result = await sequelize.query("select cate_id,cate_name from category",{
        type : sequelize.QueryType.SELECT,
        model : req.context.models.Category,
        mapToModel : true
    })

    return res.send(result);
}


export default {
    findCategoryBySQL
}