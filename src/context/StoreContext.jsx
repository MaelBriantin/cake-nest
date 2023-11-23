import React, { createContext, useState } from "react";
import {fakeMenu2} from "../store/cakes/cakes.js";

export const StoreContext = createContext({
    store: fakeMenu2,
    setStore: () => {},
    resetContext: () => {}
});

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(fakeMenu2);

    const resetContext = () => {
        setStore(fakeMenu2);
    };


    return (
        <StoreContext.Provider
            value={{
                store,
                setStore,
                resetContext
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
