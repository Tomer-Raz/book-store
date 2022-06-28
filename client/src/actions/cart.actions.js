const cartActionTypes = {
    INITIAL_CART_STATE: 'INITIAL_CART_STATE',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    ADD_TO_CART: 'ADD_TO_CART',
    CHECKOUT: 'CHECKOUT',
};

export const initialCartAction = (cart) => {
    const action = {
        type: cartActionTypes.INITIAL_CART_STATE,
        payload: {
            cart: cart,
        },
    };
    return action;
};

export const removeCartAction = (bookID) => {
    const action = {
        type: cartActionTypes.REMOVE_FROM_CART,
        payload: {
            bookID: bookID,
        },
    };
    return action;
};

export const addToCartAction = (bookID) => {
    const action = {
        type: cartActionTypes.ADD_TO_CART,
        payload: {
            bookID: bookID,
        },
    };
    return action;
};

export const checkoutAction = () => {
    const action = {
        type: cartActionTypes.CHECKOUT,
        payload: {},
    }
    return action;

}

export default cartActionTypes;