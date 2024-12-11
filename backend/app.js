const express = require("express")

const connectToDB = require("./config/connectToDb")

const morgan = require("morgan")

const cors = require("cors")

require("dotenv").config()

connectToDB()

// Init App

const app = express()

//Middleware

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(morgan("dev"));

app.use(cors())


//routes

app.use("/api/auth",require("./routes/userRoutes"));
app.use("/api/chat",require("./routes/chatRoutes"));

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server is running on ${process.env.NODE_ENV} mode on port ${PORT}`)
})