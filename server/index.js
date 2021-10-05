import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import middleware from"./helpers/middleware";

import models,{sequelize} from "./models/init-models";
import routes from "./routes/IndexRoute";
import authJWT from "./helpers/authJWT";
import { authenticate } from "./helpers/authJWT";

const port  = process.env.PORT || 1337;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(helmet())
app.use(compress())
app.use(cors());

app.use(async(req,res,next)=>{
    req.context = {models};
    next();
});

/*
app.use(process.env.URL_DOMAIN,(req,res) =>{
    res.send("Hello eshopay");
});
*/


app.post(process.env.URL_DOMAIN+"/login",authJWT.authenticate,authJWT.login)

app.get(process.env.URL_DOMAIN+"/me",authJWT.ensureAdmin,(req,res)=>{
    res.json("coo");
})

app.use(process.env.URL_DOMAIN,routes.authRoute);

app.use(process.env.URL_API+"/category",routes.categoryRoute);
app.use(process.env.URL_API+"/carts",routes.cartRoute);
app.use(process.env.URL_API+"/products",routes.productRoute);
app.use(process.env.URL_API+"/users",routes.userRoute);

app.use(middleware.handleError);
app.use(middleware.notFound);
app.use(middleware.cors);

const dropDatabaseSync = false;

sequelize.sync({force : dropDatabaseSync}).then(async()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }
    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`);
    });
})

export default app;