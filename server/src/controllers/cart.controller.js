import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
    const user = req.user;
    try {
        const cart = await Cart.findOne(user._id);
        await cart.populate('books.bookID');

        res.send({
            status: 200,
            statusText: 'ok',
            data: cart,
            message: ""
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const addBookToCart = async (req, res) => {
    const user = req.user;
    const data = req.body;

    try {
        const cart = await Cart.findOne(user._id);
        cart.books.push({ bookID: data.bookID })
        await cart.save()

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: { cart: cart },
            message: 'Book added to cart!'
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const removeFromCart = async (req, res) => {
    const user = req.user;
    const data = req.body.bookID;

    try {
        const cart = await Cart.findOne(user._id);
        const index = cart.books.findIndex(object => {
            return object.bookID.toString() === data;
        })
        cart.books.splice(index, 1)
        await cart.save()

        res.status(200).send({
            status: 200,
            statusText: 'Okay',
            data: cart,
            message: `Book removed from cart!`
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }
}

export const checkout = async (req, res) => {
    const user = req.user;

    try {
        const cart = await Cart.findOne(user._id);
        cart.books.splice(0, cart.books.length)
        await cart.save()

        res.status(200).send({
            status: 200,
            statusText: 'Okay',
            data: cart,
            message: 'Checkout completed, user cart now is empty!'
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: "Bad request",
            message: '',
        })
    }

}