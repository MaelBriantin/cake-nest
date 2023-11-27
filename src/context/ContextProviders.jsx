import {AdminProvider} from "./AdminContext.jsx";
import {UserProvider} from "./UserContext.jsx";
import {StoreProvider} from "./StoreContext.jsx";
import {Children} from "react";

export const ContextProviders = ({children}) => {
    return (
        <AdminProvider>
            <UserProvider>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </UserProvider>
        </AdminProvider>
    )
}