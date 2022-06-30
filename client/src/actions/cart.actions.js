const cartActionTypes = {
    INITIAL_CART_STATE: 'INITIAL_CART_STATE',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    ADD_TO_CART: 'ADD_TO_CART',
    CHECKOUT: 'CHECKOUT',
};

const { INITIAL_CART_STATE, REMOVE_FROM_CART, ADD_TO_CART, CHECKOUT } = cartActionTypes

export const initialCartAction = (cart) => {
    const action = {
        type: INITIAL_CART_STATE,
        payload: {
            cart,
        },
    };
    return action;
};

export const removeCartAction = (bookID) => {
    const action = {
        type: REMOVE_FROM_CART,
        payload: {
            bookID,
        },
    };
    return action;
};

export const addToCartAction = (bookID) => {
    const action = {
        type: ADD_TO_CART,
        payload: {
            bookID,
        },
    };
    return action;
};

export const checkoutAction = () => {
    const action = {
        type: CHECKOUT,
        payload: {},
    }
    return action;

}

export default cartActionTypes;