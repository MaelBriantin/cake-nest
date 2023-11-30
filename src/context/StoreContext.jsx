import React, { createContext, useState } from "react";
import {fakeMenu2} from "../store/cakes/cakes.js";
import {getMenu, updateMenu} from "../api/user.js";

export const StoreContext = createContext({
    store: fakeMenu2,
    setStore: () => {},
    storeUser: {},
    setStoreUser: () => {},
    resetContext: () => {},
    selectedItem: {},
    setSelectedItem: () => {},
    resetSelectedItem: () => {},
    openedCart: false,
    setOpenedCart: () => {},
    isAdd: null,
    setIsAdd: () => {},
    deleteItem: () => {},
    updateItem: () => {}
});

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(fakeMenu2);
    const [selectedItem, setSelectedItem] = useState({})
    const [openedCart, setOpenedCart] = useState(false)
    const [isAdd, setIsAdd] = useState(null)
    const [storeUser, setStoreUser] = useState(null)

    const resetContext = () => {
        setStore(fakeMenu2);
    };

    const resetSelectedItem = () => {
        setSelectedItem({})
    }

    const deleteItem = async (itemId) => {
        const newMenu = store.filter(i => i.id === itemId)
        await updateMenu(storeUser, newMenu)
    }

    const updateItem = async (itemId, field, value) => {
        console.log(itemId)
        const storeCopy = [...store]
        switch (field) {
            case 'title':
                storeCopy.map(i => {
                    if (i.id === itemId) {
                        i.title = value
                    }
                })
                break
            case 'imageSource':
                storeCopy.map(i => {
                    if (i.id === itemId) {
                        i.imageSource = value
                    }
                })
                break
            case 'price':
                storeCopy.map(i => {
                    if (i.id === itemId) {
                        i.price = value
                    }
                })
                break
            default:
                break
        }
        await updateMenu(storeUser, storeCopy)
        const newMenu = await getMenu(storeUser)
        setStore(newMenu)
        setSelectedItem(newMenu.find(i => i.id === itemId))
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
                setStoreUser,
                storeUser,
                deleteItem,
                updateItem
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
