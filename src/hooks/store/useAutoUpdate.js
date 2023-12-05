import {useContext, useEffect} from "react";
import {StoreContext} from "../../context/StoreContext.jsx";
import {CartContext} from "../../context/CartContext.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import {autoUpdateMenu} from "../../utils/autoUpdateMenu.js";

export const useAutoUpdate = () => {
    const {
        sync,
        setSync,
        store,
        menuId,
        setSyncFailed
    } = useContext(StoreContext)
    const {user} = useContext(UserContext)
    const {
        cart,
    } = useContext(CartContext)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (sync) {
                autoUpdateMenu(menuId, store, cart, user.id, setSync, setSyncFailed)
                setSync(false)
            }
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [store, cart, sync]);
}