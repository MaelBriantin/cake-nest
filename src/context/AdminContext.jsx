import React, { createContext, useState } from "react";

export const AdminContext = createContext({
    adminMode: false,
    setAdminMode: () => {},
    openedPanel: true,
    setOpenedPanel: () => {},
    selectedTab: '',
    setSelectedTab: () => {}
});

export const AdminProvider = ({ children }) => {
    const [adminMode, setAdminMode] = useState(false);
    const [openedPanel, setOpenedPanel] = useState(true);
    const [selectedTab, setSelectedTab] = useState('');

    return (
        <AdminContext.Provider
            value={{
                adminMode,
                setAdminMode,
                openedPanel,
                setOpenedPanel,
                selectedTab,
                setSelectedTab
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
