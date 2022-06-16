import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    books: [
        {
            bookID: {
                type: String,
                required: true,
            },
        },
    ]
});

const Cart = mongoose.model('Cart', cartSchema)

export default Cart;