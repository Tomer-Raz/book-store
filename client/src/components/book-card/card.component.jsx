import React from "react";
import './card.styles.css'
import { Link } from "react-router-dom";

const Card = () => {

    return (
        <div className="cards">
            <Link to='/login' className="card">
                <img id="book-img" alt="100 Things Successfull People Do" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/010200108-1643034786320633.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">100 Things Successfull People Do</h3>
                    <h4 id="book-author">Author: Nigel Cumberland</h4>
                    <h4 id="book-pages">No. of pages: 356</h4>
                    <h4 id="book-price">Price: 19.99$</h4>
                </div>
                <button id="add-to-cart-btn">Add To Cart</button>
            </Link>

            <div className="card">
                <img id="book-img" alt="Foreign" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/010073940-1635691336552216.jpg"></img>
                <h3 id="book-title">Foreign</h3>
                <h4 id="book-author">Author: Lihi Lapid</h4>
                <h4 id="book-pages">No. of pages: 251</h4>
                <h4 id="book-price">Price: 9.99$</h4>
                <button id="add-to-cart-btn">Add To Cart</button>
            </div>

            <div className="card">
                <img id="book-img" alt="How To Love Your Daughter" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/010033306-1635688688349873.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">How To Love Your Daughter</h3>
                    <h4 id="book-author">Author: Hila Bloom</h4>
                    <h4 id="book-pages">No. of pages: 153</h4>
                    <h4 id="book-price">Price: 19.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

            <div className="card">
                <img id="book-img" alt="The 5 Seconds Rule" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/013621193-1635787878409585.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">The 5 Seconds Rule</h3>
                    <h4 id="book-author">Author: Mel Robins</h4>
                    <h4 id="book-pages">No. of pages: 206</h4>
                    <h4 id="book-price">Price: 14.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

            <div className="card">
                <img id="book-img" alt="Surrounded By Psychopaths" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/011374656-1650873660364789.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">Surrounded By Psychopaths</h3>
                    <h4 id="book-author">Author: Thomas Erikson</h4>
                    <h4 id="book-pages">No. of pages: 187</h4>
                    <h4 id="book-price">Price: 17.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

            <div className="card">
                <img id="book-img" alt="Ninja Kid 8" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/010200254-1646657782309978.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">Ninja Kid 8</h3>
                    <h4 id="book-author">Author: Ann Du</h4>
                    <h4 id="book-pages">No. of pages: 81</h4>
                    <h4 id="book-price">Price: 7.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

            <div className="card">
                <img id="book-img" alt="The 5AM Club" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/010073808-1635691015315909.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">The 5AM Club</h3>
                    <h4 id="book-author">Author: Robin Sharma</h4>
                    <h4 id="book-pages">No. of pages: 191</h4>
                    <h4 id="book-price">Price: 16.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

            <div className="card">
                <img id="book-img" alt="The Math of Life and Death" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/010200220-1635694170966644.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">The Math of Life and Death</h3>
                    <h4 id="book-author">Author: Kit Yates</h4>
                    <h4 id="book-pages">No. of pages: 251</h4>
                    <h4 id="book-price">Price: 9.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

            <div className="card">
                <img id="book-img" alt="Face Of the Surface" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/010073919-1635691276348886.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">Face Of the Surface</h3>
                    <h4 id="book-author">Author: Ohad Hemo</h4>
                    <h4 id="book-pages">No. of pages: 153</h4>
                    <h4 id="book-price">Price: 19.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

            <div className="card">
                <img id="book-img" alt="Money Of Others" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/013730133-1650873279104800.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">Money Of Others</h3>
                    <h4 id="book-author">Author: Hilel Gershoni</h4>
                    <h4 id="book-pages">No. of pages: 206</h4>
                    <h4 id="book-price">Price: 14.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

            <div className="card">
                <img id="book-img" alt="The Subtle Art of Not Giving a F*ck" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/012301743-1635784067345452.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">The Subtle Art of Not Giving a F*ck</h3>
                    <h4 id="book-author">Author: Mark Manson</h4>
                    <h4 id="book-pages">No. of pages: 187</h4>
                    <h4 id="book-price">Price: 17.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

            <div className="card">
                <img id="book-img" alt="366 Doors to the Heart" src="https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/011140223-1635699837289371.jpg"></img>
                <div className="card-details">
                    <h3 id="book-title">366 Doors to the Heart</h3>
                    <h4 id="book-author">Author: Eileen Caddy</h4>
                    <h4 id="book-pages">No. of pages: 181</h4>
                    <h4 id="book-price">Price: 22.99$</h4>
                    <button id="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>

        </div>
    )
}

export default Card;