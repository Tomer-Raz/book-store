import { createContext, useReducer } from 'react';
import { cartReducer, INITIAL_CART_STATE } from '../reducers/cart.reducer.js';

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cartState, dispatchCartState] = useReducer(cartReducer, INITIAL_CART_STATE);

    const value = { cartState, dispatchCartState };

    return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
};

export default CartContextProvider;