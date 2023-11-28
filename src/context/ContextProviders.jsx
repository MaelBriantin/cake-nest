import {AdminProvider} from "./AdminContext.jsx";
import {UserProvider} from "./UserContext.jsx";
import {StoreProvider} from "./StoreContext.jsx";
import {Children} from "react";
import {CartProvider} from "./CartContext.jsx";

export const ContextProviders = ({children}) => {
    return (
        <AdminProvider>
            <UserProvider>
                <StoreProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </StoreProvider>
            </UserProvider>
        </AdminProvider>
    )
}