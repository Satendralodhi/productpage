const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const connection=require('./database/config')
const Product_Model=require('./model/model')
//error handller
app.use((err,req,res,next)=>{
    res.status(err.status||500)
    res.send({
       error:{
           status:err.status||500,
           message:err.message
       }
    })
   })
   connection.sync().then((r)=>{
    console.log('db connected');
   }).catch((e)=>{
    console.log(e);
   })
   const PORT=process.env.PORT||3000
   app.listen(PORT,()=>{
       console.log("server started on port ",PORT,'.............')
   })
