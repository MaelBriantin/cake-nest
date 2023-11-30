import React, { createContext, useState } from "react";
import {fakeMenu2} from "../store/cakes/cakes.js";
import {getMenu, updateMenu} from "../api/menu.js";

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
    setIsAdd: () => {},
    menuId: null,
    setMenuId: () => {},
    addCake: () => {},
    deleteCake: () => {}
});

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(fakeMenu2);
    const [menuId, setMenuId] = useState(null)
    const [selectedItem, setSelectedItem] = useState({})
    const [openedCart, setOpenedCart] = useState(false)
    const [isAdd, setIsAdd] = useState(null)

    const resetContext = () => {
        setStore(fakeMenu2);
    };

    const resetSelectedItem = () => {
        setSelectedItem({})
    }

    const addCake = async (newItem) => {
        const newMenu = [newItem, ...store]
        await updateMenu(menuId, newMenu).then(r => r)
        const updatedMenu = await getMenu(menuId)
        setStore(updatedMenu)
    }

    const deleteCake = async (cakeId) => {
        const newMenu = store.filter(i => i.id !== cakeId)
        await updateMenu(menuId, newMenu).then(r => r)
        const updatedMenu = await getMenu(menuId)
        setStore(updatedMenu)
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
                setIsAdd,
                menuId,
                setMenuId,
                addCake,
                deleteCake
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
