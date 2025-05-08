



import User from "../schema/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
const SECRET_KEY = process.env.SECRET_KEY

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).send({ error: "Please fill all the fields" })
    }
    const password1 = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: password1 });
    return { user }
  } catch (error) {
    console.log("error", error);
  }
};

const getUsers = async (req, res) => {
  const users = await User.find()
  return { users }
}
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)


  return user
}
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  return user
}

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!user) return res.status(404).send({ message: "users not found" })
  return { user }
}

//const loginUser = async (req, res) => {
//     // const { email, password } = req.body;
//     // const user = await User.findOne({ email });
//     // if (!user) {
//     //     return res.status(404).send({ message: "user not found" })
//     // }
//     // const isMatch = await bcrypt.compare(password, user.password);
//     // if (!isMatch) {
//     //     return res.status(404).send({ message: "user not found" })
//     // }
//     // const accessToken = jwt.sign({ user: user._id }, SECRET_KEY, { expiresIn: 1500 })
//     // return { user, accessToken }
//     passport.authenticate("local", (err, user) => {
//         if (err) {
//             return res.status(404).send({ message: "user not found" })
//         }
//         if (!user) {
//             return res.status(404).send({ message: "user not found" })
//         }
//         const accessToken = jwt.sign({ user: user._id }, SECRET_KEY, { expiresIn: 1500 })
//         return res.status(200).json({
//             message: "Login successful",
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 token: accessToken
//             }
//         })
//     })
// } 


const loginUser = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: info.message || 'Authentication failed' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to log in user' });
      }

      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res);
};

export const authService = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser
};
