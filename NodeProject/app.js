require("dotenv").config();
const express=require("express");
const app=express();
const cors = require('cors');
app.use(express.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));



const userRouter = require("./api/user.router");

/**app.get("/api",(req,res)=>{
    res.json({
        success:1,
        message:'This is rest api working'
    })

});**/
app.use("/user", userRouter);
const port = process.env.APP_PORT || 4000;
app.listen(process.env.APP_PORT,()=>{
    console.log("Server is up and running on port:",process.env.APP_PORT);
})