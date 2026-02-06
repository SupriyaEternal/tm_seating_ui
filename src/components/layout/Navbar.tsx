import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";
import tm_logo from "../../assets/images/tm_logo.png";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {

    const { user, Logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggle = () => setOpen((p) => !p);

    const handleLogout = async () => {
        try {
            await Logout();
            navigate("/login");
        } 
        
        catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <nav className="w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
            
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/user-selection")}>
                <img
                    src={tm_logo}
                    alt="TM Logo"
                    className="h-10 w-10 transition-transform group-hover:scale-105"
                />
            </div>

            <h1 className="text-xl font-bold tracking-tight text-gray-800 hidden md:block">
                {import.meta.env.VITE_PROJECT_NAME || "Dashboard"}
            </h1>

            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={toggle} 
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                >
                    <div className="w-9 h-9 rounded-full bg-[#2b4d94] flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {user?.user_name ? user.user_name.charAt(0).toUpperCase() : "U"}
                    </div>

                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                            {user?.user_name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 leading-tight">
                            {user?.user_access || "Role"}
                        </p>
                    </div>

                    <DownOutlined 
                        className={`text-gray-500 text-xs transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
                        
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-sm font-semibold text-gray-900">
                                {user?.user_name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {user?.user_email || "user@example.com"}
                            </p>
                        </div>

                        <div className="py-2">
                            <button
                                onClick={() => {
                                    navigate("/dashboard/user-management");
                                    setOpen(false);
                                }}
                                className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-gray-700 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                <UserOutlined className="text-base" />
                                <span className="font-medium">User Portal</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-red-600 text-sm hover:bg-red-50 transition-colors"
                            >
                                <LogoutOutlined className="text-base" />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
