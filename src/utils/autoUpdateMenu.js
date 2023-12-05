import { getUserMenu, updateMenu, updateCart } from "../api/menu.js";
import { equals } from "./compareObjects.js";
/**
 * Deeply compares the state of remote store to the local state.
 * If the states are different the local store is push to firebase.
 *
 * @returns {void}
 */
export const autoUpdateMenu = async (menuId, store, cart, userId, setSync, setSyncFailed) => {
    const remoteState = await getUserMenu(userId);
    const remoteMenu = remoteState.data.menu;
    const remoteCart = remoteState.data.cart;
    if (!equals(remoteMenu, store) || !equals(remoteCart, cart)) {
        try {
            await updateMenu(menuId, store);
            await updateCart(menuId, cart);
        } catch (e) {
            setSyncFailed(true);
            console.error(e);
        }
    }
};