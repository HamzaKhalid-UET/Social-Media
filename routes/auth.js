const express = require("express")
const route = express.Router()
route.get("/", (req, res) => {
    console.log("hello")
    res.send("hello from route")
})

module.exports = route