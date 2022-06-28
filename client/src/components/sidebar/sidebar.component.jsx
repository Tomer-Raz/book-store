import React from "react";
import './sidebar.styles.css'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth.context";
import { useContext } from "react";
import environments from "../../environments/environments";

const Sidebar = (props) => {
    const authContextValue = useContext(AuthContext)

    const API_URL = environments.API_URL;
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/users/logout`, {
                method: 'Post',
                headers: {
                    'Authorization': `Bearer ${authContextValue.userToken}`,
                },
            });

            if (!response.ok) {
                throw new Error();
            }

            localStorage.removeItem('user-token');
            authContextValue.setUserToken(null);
            props.hideSidebar();
            navigate('/login');

        } catch (err) {
            alert('Something went wrong')
        }
    }

    return (
        <div className={`sidebar-page ${props.className}`}>
            <div className="sidebar-container">
                <div className="links">
                    <button id="button" onClick={props.hideSidebar}>X</button>
                    <ul>
                        <li>
                            <Link to='/' className="sidebar-link" onClick={props.hideSidebar}>Home</Link>
                        </li>

                        {authContextValue.userToken ? null : <li>
                            <Link to="/login" className="sidebar-link" onClick={props.hideSidebar}>
                                Login
                            </Link>
                        </li>}

                        {authContextValue.userToken ? null : <li>
                            <Link to="/signup" className="sidebar-link" onClick={props.hideSidebar}>
                                Sign Up
                            </Link>
                        </li>}

                        {!authContextValue.userToken ? null : <li>
                            <Link to="/cart" className="sidebar-link" onClick={props.hideSidebar} >
                                Cart
                            </Link>
                        </li>}

                        {!authContextValue.userToken ? null : <li>
                            <Link to="/login" className="sidebar-link" onClick={handleLogout} >
                                Log Out
                            </Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Sidebar;