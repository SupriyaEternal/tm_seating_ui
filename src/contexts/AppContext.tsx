import { createContext, useContext } from "react";
import type { AppProviderPropsType, AppContextType } from "../types/context";

const AppContext = createContext<AppContextType | undefined>(undefined);


export const AppProvider= ({ children }:AppProviderPropsType) => {
    
    const hostname = window.location.hostname
    const ip_address = import.meta.env.VITE_IP_ADDRESS
    const backend_port = import.meta.env.VITE_BACKEND_PORT
    const backendURL = `http://${hostname ?? ip_address ?? 'localhost'}:${backend_port ?? 4000}`;


    return (
        <AppContext.Provider
            value={{backendURL}}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {

    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
