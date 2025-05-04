const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const Mongoose=require ("mongoose")

const {MONGOURI} = require("./valuekeys")
Mongoose.connect(MONGOURI)


mongoose.connection.on("connected", () => {
    console.log("we are connected to mongo i.e Mongo DB")
})
mongoose.connection.on("error", (err) => {
    console.log("error while connecting to mongo i.e Mongo DB",err)
})
const PORT = process.env.PORT || 3000


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
