import React from "react";
import Sidebar from "../sidebar/Sidebar.component";
import { useState } from "react";
import { Link } from "react-router-dom";
import './header.styles.css'

const Header = () => {

    const [isSidebarShown, setSidebar] = useState('');

    const handleClick = () => {
        setSidebar('show');
    }

    const hideSidebar = () => setSidebar('');

    return (
        <div>
            <div className="header">
                <Link to='/' id="header-title">
                    <h1>Book Store</h1>
                </Link>
                <div className="button-position">
                    <button className="hamburger-button" onClick={handleClick}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </button>
                </div>
            </div>
            <Sidebar className={isSidebarShown} hideSidebar={hideSidebar} />
        </div>
    )
}

export default Header;