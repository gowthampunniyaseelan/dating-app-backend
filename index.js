import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js"
import Cors from "cors"
import dotenv from "dotenv"

// App Config
const app = express();
const port = process.env.PORT || 8001
dotenv.config()

// Middleware
app.use(Cors())
app.use(express.json())

// DB Config
const connection_url = process.env.DB_URI
mongoose.connect(connection_url,{
  useNewUrlParser: true, 
})

// API Endpoints
app.get("/",(req,res)=>{
  res.status(200).send("Hello i am gowtham")
})

app.post("/dating/cards",(req,res)=>{
  Cards.create(req.body,(err,data)=>{
    if(err){
      res.status(500).send(err)
    }
    else{
      res.status(201).send(data)
    }
  })
})

app.get("/dating/cards",(req,res)=>{
  Cards.find((err,data)=>{
    if(err){
      res.status(500).send(err)
    }else{
      res.status(200).send(data)
    }
  })
})

// listener
app.listen(port,()=>{
  console.log(`Listening on Localhost:${port}`)
})