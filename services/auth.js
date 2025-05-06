


const User = require("./../schema/User");

const createUser = async (req, res) => {
    console.log("req.body", req.body);
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ error: "Please fill all the fields" })
        }

        const user = await User.create({ name, email, password });
        console.log("user", user);
        return { user }
    } catch (error) {
        console.log("error", error);
        // res.status(500).send({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    const users = await User.find()
    console.log("users", users)
    return { users }
}
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id)
    console.log("user", user)
    return user 
}
module.exports = {
    createUser,
    getUsers,
    getUserById
};
