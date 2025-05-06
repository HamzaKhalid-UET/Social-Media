const express = require("express")
const { createUserController, getUserController, getUserByIdController, deleteUserByIdController, updateUserController } = require("../controllers/auth")
const route = express.Router()
// route.get("/", (req, res) => {
//     console.log("hello")
//     res.send("hello from route")
// })

route.post("/createuser", createUserController)
route.get("/getusers", getUserController)
route.get("/getuserbyid/:id", getUserByIdController)
route.delete("/deleteuser/:id", deleteUserByIdController)
route.put("/updateuser/:id", updateUserController)


module.exports = route