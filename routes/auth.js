import express from "express";
import { authController } from '../controllers/auth.js';
const { createUserController, getUserController, getUserByIdController, deleteUserByIdController, updateUserController, loginUserController } = authController
const route = express.Router()
route.get("/", (req, res) => {
    console.log("hello")
    res.send("hello from route")
})

route.post("/createuser", createUserController)
route.get("/getusers", getUserController)
route.get("/getuserbyid/:id", getUserByIdController)
route.delete("/deleteuser/:id", deleteUserByIdController)
route.put("/updateuser/:id", updateUserController)
route.post("/login",loginUserController)



export default route;