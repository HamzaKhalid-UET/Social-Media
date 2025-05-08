import passport from 'passport';
import { authService } from '../services/auth.js';
const { createUser, getUsers, getUserById, deleteUser, updateUser, loginUser } = authService;
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY

const createUserController = async (req, res) => {
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
    const users = await getUserById(req, res)
    if (!users) return res.status(404).send({ message: "users not found" })
    res.status(200).send({ message: "user fetched successfully", users });
}
const deleteUserByIdController = async (req, res) => {
    const users = await deleteUser(req, res)
    if (!users) return res.status(404).send({ message: "users not found" })
    res.status(200).send({ message: "user deleted successfully", users });
}
const updateUserController = async (req, res) => {
    const users = await updateUser(req, res)
    if (!users) return res.status(404).send({ message: "users not found" })
    res.status(200).send({ message: "user updated successfully", users });
}
// const loginUserController = async (req, res) => {
//     const user = await loginUser(req, res)
//     if (!user) return res.status(404).send({ message: "user not found" })

//     res.status(200).json({
//         message: "Login successful",
//         user: {
//             name: user.user.name,
//             email: user.user.email,
//             token: user.accessToken
//         }
//     });
// } 

const loginUserController = async (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }

        if (!user) {
            return res.status(401).json({
                message: info?.message || 'Invalid credentials',
            });
        }


        const accessToken = jwt.sign({ user: user._id }, SECRET_KEY, { expiresIn: 1500 })


        return res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
            },
            token: accessToken,
        });
    })(req, res, next);
};
export const authController = {
    createUserController,
    getUserController,
    getUserByIdController,
    deleteUserByIdController,
    updateUserController,
    loginUserController
};