const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const superMarkets = require("./routes/api/superMarkets")
const overAll = require("./routes/api/overAll")
const items = require("./routes/api/items")

const app = express()

//Bodyparser Middleware
app.use(bodyParser.json())

// DB Config

const db = require("./config/keys").mongoURI

//Connect to Mongo

mongoose
	.connect(db, { useNewUrlParser: true, useFindAndModify: false })
	.then(()=>console.log("MongoDB connected..."))
	.catch(err => console.log(err))

//Use Routes

app.use("/api/superMarkets",superMarkets)
app.use("/api/overall",overAll)
app.use("/api/items",items)

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Server Started on port ${port}`))