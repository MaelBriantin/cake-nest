import React, { createContext, useState } from "react";
import {fakeMenu2} from "../store/cakes/cakes.js";

export const StoreContext = createContext({
    store: fakeMenu2,
    setStore: () => {},
    resetContext: () => {},
    selectedItem: {},
    setSelectedItem: () => {},
    resetSelectedItem: () => {},
    openedCart: false,
    setOpenedCart: () => {},
    isAdd: null,
    setIsAdd: () => {}
});

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(fakeMenu2);
    const [selectedItem, setSelectedItem] = useState({})
    const [openedCart, setOpenedCart] = useState(false)
    const [isAdd, setIsAdd] = useState(null)

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
                resetSelectedItem,
                openedCart,
                setOpenedCart,
                isAdd,
                setIsAdd
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
