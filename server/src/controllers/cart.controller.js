import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
    const user = req.user;
    try {
        const cartBooks = await Cart.find();
        const userCart = cartBooks.filter((data) => data.ownerID.toString() == user._id)

        res.send({
            status: 200,
            statusText: 'ok',
            data: userCart,
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
        const cart = new Cart({
            ownerID: user._id,
            books: { bookID: data.bookID },
        });

        await cart.save();

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: cart,
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
        const cartBooks = await Cart.find();
        const userCart = cartBooks.filter((x) => x.ownerID.toString() == user._id)

        for (let i = 0; i < userCart.length; i++) {
            if (userCart[i].books[0].bookID == data) {
                await Cart.findByIdAndDelete(userCart[i]._id)
            }
        }

        const cartAfter = await Cart.find();
        const userCartAfter = cartAfter.filter((x) => x.ownerID.toString() == user._id)

        res.status(201).send({
            status: 200,
            statusText: 'Okay',
            data: userCartAfter,
            message: 'Book removed from cart!'
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
        const cartBooks = await Cart.find();
        const userCart = cartBooks.filter((x) => x.ownerID.toString() == user._id)

        for (let i = 0; i < userCart.length; i++) {
            await Cart.findByIdAndDelete(userCart[i]._id.toString())
        }

        res.status(200).send({
            status: 200,
            statusText: 'Okay',
            data: {},
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