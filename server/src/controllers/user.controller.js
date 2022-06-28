import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.send({
            status: 200,
            statusText: "ok",
            data: users,
            message: '',
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const createUser = async (req, res) => {
    const data = req.body;
    const user = new User(data);
    try {

        await user.save();

        const token = await user.createToken();

        const cart = new Cart({
            ownerID: user._id,
            books: [],
        });

        await cart.save()

        res.status(201).send({
            status: 201,
            statusText: "Created",
            data: {
                user: user,
                token: token
            },
            message: "user was created!"
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: err
        })
        console.log(err);
    }
}

export const getUser = async (req, res) => {
    const userID = req.params.userID;
    const user = await User.findById(userID)

    try {
        res.status(200).send({
            status: 200,
            statusText: "ok",
            data: user,
            message: ''
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: ''
        })
    }
}

export const deleteUser = async (req, res) => {
    const userID = req.params.userID
    await User.findByIdAndDelete(userID)

    try {
        res.status(200).send({
            status: 200,
            statusText: "ok",
            data: {},
            message: "User deleted successfully!"
        })
    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: ''
        })
    }
}

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) {
            throw new Error();
        }

        const user = await User.findUserByDetails(email, password)
        const token = await user.createToken();

        res.status(200).send({
            status: 200,
            statusText: "ok",
            data: {
                user: user,
                token: token
            },
            message: "User logged in successfully!"
        })


    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: "",
        })
    }
}

export const logout = async (req, res) => {
    const user = req.user;
    const token = req.token;

    try {
        user.tokens = user.tokens.filter((currentToken) => currentToken.token !== token);

        await user.save();

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: {},
            message: 'User was logged out successfully',
        })
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal server error',
            message: '',
        })
    }
}