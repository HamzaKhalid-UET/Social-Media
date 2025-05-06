const { createUser, getUsers, getUserById } = require("../services/auth")




const createUserController = async (req, res) => {
    console.log("req.body", req.body);
    const user = await createUser(req, res);
    if (!user) return res.status(404).send({ message: "user not created" })
    res.status(201).send({ message: "user created successfully", user });

}

const getUserController = async (req, res) => {
    const users = await getUsers(req, res)
    if (!users) return res.status(404).send({ message: "users not found" })
    res.status(200).send({ message: "user fetched successfully", users });

}
const getUserByIdController = async (req, res) => {
    console.log("req.params.id", req)
    const users = await getUserById(req, res)
    if (!users) return res.status(404).send({ message: "users not found" })
    res.status(200).send({ message: "user fetched successfully", users });
}


module.exports = {
    createUserController,
    getUserController,
    getUserByIdController
}