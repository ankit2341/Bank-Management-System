const {connection}=require("./Config/database");
const cors=require("cors");
const express=require("express");
// const { accountsRouter } = require("./routes/Bookings.route");
// const { eventsRouter } = require("./routes/Events.route");
const app=express();
app.use(express.json());
app.use(cors({origin:"*"}));

app.use("/users",usersRouter);
app.use("/accounts",accountsRouter);


app.get("/",async(req,res)=>{
    try{
       res.status(200).send("welocme to ecamp database");
    }
    catch(err){
        res.status(404).send({"msg":"error connecting to api"})
    }
})

app.listen(4500,async(req,res)=>{
    try{
        await connection;
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
    console.log("running server")
})