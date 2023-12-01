import React, {createContext, useEffect, useState} from "react";
import {theme} from "../theme/index.js";
import {auth} from "../api/auth.js";

export const UserContext = createContext({
    user: '',
    setUser: () => {},
    color: '',
    setColor: () => {}
});


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(''
        // {name: auth.currentUser.displayName, id: auth.currentUser.uid}
    );
    const [color, setColor] = useState(theme.colors.primary);

    useEffect(() => {
        localStorage.setItem('userId', JSON.stringify(user.id))
    }, [user, setUser]);

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
