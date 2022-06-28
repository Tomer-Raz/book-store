import cartActionTypes from "../actions/cart.actions.js"

export const INITIAL_CART_STATE = { cart: [], price: 0 }

export const cartReducer = (state, action) => {
    switch (action.type) {
        case cartActionTypes.INITIAL_CART_STATE: {
            const cart = action.payload.cart;
            let price = 0;

            for (let i = 0; i < cart.length; i++) {
                price += cart[i].bookID.price
            }
            const newState = { cart: cart, price: price }
            return newState;
        }

        case cartActionTypes.REMOVE_FROM_CART: {
            const bookID = action.payload.bookID;
            const updatedCart = state.cart.filter((x) => x.bookID._id !== bookID)

            let price = 0;

            for (let i = 0; i < updatedCart.length; i++) {
                price += updatedCart[i].bookID.price
            }

            const newState = { cart: updatedCart, price: price }
            return newState;
        }

        case cartActionTypes.ADD_TO_CART: {
            const bookID = action.payload.bookID;
            const updatedCart = [...state.cart, { 'bookID': bookID }]

            let price = 0;

            for (let i = 0; i < updatedCart.length; i++) {
                price += updatedCart[i].bookID.price
            }

            const newState = { cart: updatedCart, price: price }
            return newState;
        }

        case cartActionTypes.CHECKOUT: {
            return { cart: [], price: 0 }
        }
        default:
            return state;
    }
}