import React, { createContext, useState } from "react";
import {theme} from "../theme/index.js";

export const UserContext = createContext({
    user: '',
    setUser: () => {},
    color: '',
    setColor: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [color, setColor] = useState(theme.colors.primary);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                color,
                setColor
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
