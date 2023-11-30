import React, {createContext, useEffect, useState} from "react";
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
    menuId: null,
    setMenuId: () => {},
    addCake: () => {},
    deleteCake: () => {},
    autoUpdateMenu: () => {},
    sync: false,
    setSync: () => {},
    syncFailed: false,
    setSyncFailed: () => {}
});


export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(fakeMenu2);
    const [menuId, setMenuId] = useState('')
    const [selectedItem, setSelectedItem] = useState({})
    const [openedCart, setOpenedCart] = useState(false)
    const [sync, setSync] = useState(false)
    const [syncFailed, setSyncFailed] = useState(false)

    // console.log('syncFailed', syncFailed)
    // console.log('sync', sync)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (sync) {
                console.log('update')
                autoUpdateMenu().then(r => r);
                setSync(false)
            }
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [store, sync]);

    const resetContext = async (e) => {
        //await updateMenu(menuId, fakeMenu2);
        setStore(fakeMenu2)
        setSync(true)
    };

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         if (sync) {
    //             console.log('update')
    //             autoUpdateMenu().then(r => r);
    //             setSync(false)
    //         }
    //     }, 4000);
    //
    //     return () => clearTimeout(timeoutId);
    // }, [store, sync]);

    const resetSelectedItem = () => {
        setSelectedItem({})
    }

    const addCake = async (newItem) => {
        const newMenu = [...store, newItem]
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

    const updateCake = async (cake) => {
        const filteredMenu = store.filter(i => i.id !== cake.id)
        await updateMenu(menuId, [...filteredMenu, cake]).then(r => r)
        const updatedMenu = await getMenu(menuId)
        setStore(updatedMenu)
    }

    const autoUpdateMenu = async () => {
        console.log('menuId', menuId)
        try {
            await updateMenu(menuId, store)
        } catch (e) {
            setSyncFailed(true)
            console.error(e)
        }
        //const newMenu = await getMenu(menuId)
        //setStore(newMenu)
        // await updateMenu(menuId, store);
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
                menuId,
                setMenuId,
                addCake,
                deleteCake,
                autoUpdateMenu,
                sync,
                setSync,
                syncFailed,
                setSyncFailed
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
