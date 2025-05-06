const express = require("express")
const { createUserController, getUserController, getUserByIdController } = require("../controllers/auth")
const route = express.Router()
route.get("/", (req, res) => {
    console.log("hello")
    res.send("hello from route")
})

route.post("/createuser",createUserController)
route.get("/getusers",getUserController)
route.get("/getuserbyid/:id",getUserByIdController)

module.exports = route