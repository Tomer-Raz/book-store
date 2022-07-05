import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";

import { ErrorResponse, SuccessResponse } from "../models/response.model.js";

// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find()

//         res.send({
//             status: 200,
//             statusText: "ok",
//             data: users,
//             message: '',
//         })

//     } catch (err) {
//         res.status(500).send({
//             status: 500,
//             statusText: "Internal server error",
//             message: '',
//         })
//     }
// }
// export const getUser = async (req, res) => {
//     const userID = req.params.userID;
//     const user = await User.findById(userID)

//     try {
//         res.status(200).send({
//             status: 200,
//             statusText: "ok",
//             data: user,
//             message: ''
//         })

//     } catch (err) {
//         res.status(500).send({
//             status: 500,
//             statusText: "Internal server error",
//             message: ''
//         })
//     }
// }

// export const deleteUser = async (req, res) => {
//     const userID = req.params.userID

//     try {
//         await User.findByIdAndDelete(userID)

//         res.status(200).send({
//             status: 200,
//             statusText: "ok",
//             data: {},
//             message: "User deleted successfully!"
//         })
//     } catch (err) {
//         res.status(400).send({
//             status: 400,
//             statusText: "Bad request",
//             message: ''
//         })
//     }
// }

export const createUser = async (req, res, next) => {
    const data = req.body;
    const user = new User(data);

    if (!data.firstName || data.firstName === '') {
        res.status(400).send();
        return;
    } else {
        next();
    }

    try {
        await user.save();
        const token = await user.createToken();

        const cart = new Cart({
            ownerID: user._id,
            books: [],
        })
        await cart.save()

        res.status(201).send(new SuccessResponse(201, "Created", { user, token }, "user was created!"))
    } catch (err) {
        res.status(500).send(new ErrorResponse(500, "Internal server error", ""))
    }
}

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(400).send();
        return;
    }
    try {
        const user = await User.findUserByDetails(email, password)
        const token = await user.createToken();

        res.status(200).send(new SuccessResponse(200, "Ok", { user, token }, "User logged in successfully!"))

    } catch (err) {
        res.status(403).send(new ErrorResponse(403, "Forbidden", ""))
    }
}

export const logout = async (req, res) => {
    const user = req.user;
    const token = req.token;

    try {
        user.tokens = user.tokens.filter((currentToken) => currentToken.token !== token);
        await user.save();

        res.status(200).send(new SuccessResponse(200, "Ok", {}, 'User logged out successfully'))

    } catch (err) {
        res.status(500).send(new ErrorResponse(500, "Internal server error", ''))
    }
}