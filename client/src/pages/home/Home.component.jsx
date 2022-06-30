import React, { useContext, useEffect } from "react";
import './home.styles.css'
import CardContainer from "./card-container/CardContainer.component";
import { initialCartAction } from "../../actions/cart.actions";
import { AuthContext } from "../../context/Auth.context";
import { CartContext } from "../../context/Cart.context";
import { getCart } from "../../services/cart.service";

const Home = () => {

    const { userToken } = useContext(AuthContext)
    const { dispatchCartState } = useContext(CartContext)

    useEffect(() => {
        if (userToken) {
            const checkCart = async () => {
                try {
                    const { data: { books } } = await getCart(userToken)

                    const action = initialCartAction(books)
                    dispatchCartState(action);

                } catch (err) {
                    console.log(err);
                };
            }
            checkCart();
        }
    }, [])

    return (
        <div className="homepage-container">
            <div className="titles">
                <h1 id="head-title">Welcome to the home page!</h1>
                <h2 id="secondary-title">Take a look at our books</h2>
                <CardContainer />
            </div>
        </div>
    )
}

export default Home;