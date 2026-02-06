import { createContext, useContext, useEffect, useState } from "react";
import type { UserType } from "../types/user";
import type { AuthContextType } from "../types/context";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const useMock = true;
    const mockUser: UserType = {
        user_id: "demo-user",
        user_email: "demo@tm.com",
        user_name: "Demo User",
        user_access: "Super Admin",
    };

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (useMock) {
            return true;
        }
        const stored = localStorage.getItem("isAuthenticated") === "true";
        return stored;
    });

    const [user, setUser] = useState<UserType | null>(null);

    const CheckAuth = async () => {
        if (useMock) {
            setIsAuthenticated(true);
            setUser(mockUser);
            localStorage.setItem("isAuthenticated", "true");
            return;
        }
        setIsAuthenticated(false);
        setUser(null);
        localStorage.setItem("isAuthenticated", "false");
    };

    const Login = async (email: string, password: string) => {
        if (useMock) {
            setIsAuthenticated(true);
            setUser({ ...mockUser, user_email: email });
            localStorage.setItem("isAuthenticated", "true");
            return;
        }
        await CheckAuth();
    };

    const Logout = async () => {
        if (useMock) {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.setItem("isAuthenticated", "false");
            return;
        }
        setIsAuthenticated(false);
        setUser(null);
        localStorage.setItem("isAuthenticated", "false");
    };

    useEffect(() => {
        CheckAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, Login, Logout, CheckAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
