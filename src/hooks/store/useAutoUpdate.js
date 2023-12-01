import {useContext, useEffect} from "react";
import {StoreContext} from "../../context/StoreContext.jsx";

export const useAutoUpdate = () => {
    const {
        sync,
        setSync,
        autoUpdateMenu,
        store
    } = useContext(StoreContext)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (sync) {
                autoUpdateMenu();
                setSync(false)
            }
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [store, sync]);
}