require("dotenv").config();
const express = require("express")
const route = require("./routes/auth")
const app = express()
const Mongoose = require("mongoose")
const MONGOURI = process.env.MONGOURI



Mongoose.connect(MONGOURI)
app.use(express.json());

app.use("/", route)


Mongoose.connection.on("connected", () => {
    console.log("we are connected to mongo i.e Mongo DB")
})
Mongoose.connection.on("error", (err) => {
    console.log("error while connecting to mongo i.e Mongo DB",err)
})

const PORT = process.env.PORT || 3001


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
