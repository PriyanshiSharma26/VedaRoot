
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import connectToDatabase from "./db/dbConfig.js";
import AdminRouter from "./routes/Admin.route.js";
import UserRouter from "./routes/User.route.js";
const app = express();

connectToDatabase()
.then(()=>{
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));


  app.use("/Admin",AdminRouter);
  app.use("/User",UserRouter)
  // app.use("/category",CategoryRouter);


  
  app.listen(3000,()=>{
    console.log("Server Started....");
  });
})
.catch(err=>
{
  console.log(err)
})

