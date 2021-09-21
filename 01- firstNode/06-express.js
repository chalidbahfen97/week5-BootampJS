const express = require('express');
const Pool = require("pg").Pool;
const pool = new Pool({
    host : "localhost",
    user : "postgres",
    password : "postgres",
    database : "test",
    port : 5432
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001 ;

app.listen(port,()=>{`Server Listening on Port ${port}`});

//create crud with sql raw native table regions
app.get("/api/v1/regions",(req,res)=> {
    //call pool for query
    pool.query("select region_id, region_name from regions",
    [],(error,result)=>{
        if(error){
            throw error;
        }

        res.status(200).json(result.rows);
    }
    )
});

app.get("/api/v1/regions/id",(req,res)=> {
    const {id} =req.params;
    //call pool for query
    pool.query("select region_id, region_name from regions where region_id=$1",
    [id],(error,result)=>{
        if(error){
            throw error;
        }

        res.status(200).json(result.rows);
    }
    )
});

app.post("/api/v1/regions",(req,res)=> {
    const {region_name} =req.body;
    pool.query("insert into regions (region_name) values ($1)",
    [region_name],
    (error,result)=>{
        if(error){
            throw error;
        }

        res.status(201).json(result.rowCount);
    }
    )
});

app.delete("/api/v1/regions/:id",(req,res)=> {
    const {id} =req.params;
    pool.query("delete from regions where region_id=($1)",
    [id],
    (error,result)=>{
        if(error){
            throw error;
        }

        res.status(201).json(result.rowCount);
    }
    )
});

app.put("/api/v1/regions/",(req,res)=> {
    const {region_id,region_name} =req.body;
    pool.query("update regions set region_name = $1 where region_id=$2",
    [region_name,region_id],(error,result)=>{
        if(error){
            throw error;
        }

        res.status(200).json(result.rowCount);
    }
    )
});