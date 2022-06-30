import React, { useContext } from "react";
import './sidebar.styles.css'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth.context";
import { userLogout } from "../../services/user.service";
import { ERROR_MESSAGE, USER_TOKEN } from "../../constants/constants";

const Sidebar = (props) => {
    const { className, hideSidebar } = props
    const { userToken, setUserToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await userLogout(userToken)

            localStorage.removeItem(USER_TOKEN);
            setUserToken(null);
            hideSidebar();
            navigate('/login');

        } catch (err) {
            alert(ERROR_MESSAGE)
        }
    }

    return (
        <div className={`sidebar-page ${className}`}>
            <div className="sidebar-container">
                <div className="links">
                    <button id="button" onClick={hideSidebar}>X</button>
                    <ul>
                        <li>
                            <Link to='/' className="sidebar-link" onClick={hideSidebar}>Home</Link>
                        </li>

                        {userToken ? null : <li>
                            <Link to="/login" className="sidebar-link" onClick={hideSidebar}>
                                Login
                            </Link>
                        </li>}

                        {userToken ? null : <li>
                            <Link to="/signup" className="sidebar-link" onClick={hideSidebar}>
                                Sign Up
                            </Link>
                        </li>}

                        {!userToken ? null : <li>
                            <Link to="/cart" className="sidebar-link" onClick={hideSidebar} >
                                Cart
                            </Link>
                        </li>}

                        {!userToken ? null : <li>
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