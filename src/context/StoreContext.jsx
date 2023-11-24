import React, { createContext, useState } from "react";
import {fakeMenu2} from "../store/cakes/cakes.js";

export const StoreContext = createContext({
    store: fakeMenu2,
    setStore: () => {},
    resetContext: () => {},
    selectedItem: {},
    setSelectedItem: () => {},
    resetSelectedItem: () => {}
});

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(fakeMenu2);
    const [selectedItem, setSelectedItem] = useState({})

    const resetContext = () => {
        setStore(fakeMenu2);
    };

    const resetSelectedItem = () => {
        setSelectedItem({})
    }

    return (
        <StoreContext.Provider
            value={{
                store,
                setStore,
                resetContext,
                selectedItem,
                setSelectedItem,
                resetSelectedItem
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
