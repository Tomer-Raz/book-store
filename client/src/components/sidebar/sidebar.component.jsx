import React from "react";
import './sidebar.styles.css'
import { Link } from "react-router-dom";

const Sidebar = (props) => {
    return (
        <div className={`sidebar-page ${props.className}`}>
            <div className="sidebar-container">
                <div className="links">
                    <button id="button" onClick={props.hideSidebar}>X</button>
                    <ul>
                        <li>
                            <Link to='/' className="sidebar-link" onClick={props.hideSidebar}>Home</Link>
                        </li>
                        <li>
                            <Link to='/login' className="sidebar-link" onClick={props.hideSidebar}>Login</Link>
                        </li>
                        <li>
                            <Link to='/signup' className="sidebar-link" onClick={props.hideSidebar}>Sign Up</Link>
                        </li>
                        <li>
                            <Link to='/cart' className="sidebar-link" onClick={props.hideSidebar}>Cart</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;