import { createContext, useState } from 'react';
import { USER_TOKEN } from '../constants/constants';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const token = localStorage.getItem(USER_TOKEN)
    const INITIAL_STATE = token ? token : null;

    const [userToken, setUserToken] = useState(INITIAL_STATE);

    const value = { userToken, setUserToken }

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
};

export default AuthContextProvider;